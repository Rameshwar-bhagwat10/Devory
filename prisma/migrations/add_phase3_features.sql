-- Phase 3: Social Intelligence & Advanced UX
-- Migration SQL for PostgreSQL

-- 1. Create NotificationType enum
CREATE TYPE notification_type_enum AS ENUM ('LIKE', 'COMMENT', 'COLLAB_REQUEST', 'COLLAB_ACCEPT', 'FOLLOW');

-- 2. Create user_followers table
CREATE TABLE IF NOT EXISTS user_followers (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  follower_id TEXT NOT NULL,
  following_id TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT fk_follower FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_following FOREIGN KEY (following_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT unique_follower_following UNIQUE(follower_id, following_id),
  CONSTRAINT no_self_follow CHECK (follower_id != following_id)
);

-- 3. Create indexes for user_followers
CREATE INDEX IF NOT EXISTS user_followers_follower_id_idx ON user_followers(follower_id);
CREATE INDEX IF NOT EXISTS user_followers_following_id_idx ON user_followers(following_id);

-- 4. Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT NOT NULL,
  type notification_type_enum NOT NULL,
  actor_id TEXT NOT NULL,
  post_id TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_actor FOREIGN KEY (actor_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_post FOREIGN KEY (post_id) REFERENCES community_posts(id) ON DELETE CASCADE,
  CONSTRAINT no_self_notification CHECK (user_id != actor_id)
);

-- 5. Create indexes for notifications
CREATE INDEX IF NOT EXISTS notifications_user_id_idx ON notifications(user_id);
CREATE INDEX IF NOT EXISTS notifications_is_read_idx ON notifications(is_read);
CREATE INDEX IF NOT EXISTS notifications_created_at_idx ON notifications(created_at DESC);
CREATE INDEX IF NOT EXISTS notifications_user_unread_idx ON notifications(user_id, is_read) WHERE is_read = false;

-- 6. Create community_saved_posts table
CREATE TABLE IF NOT EXISTS community_saved_posts (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT NOT NULL,
  post_id TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_post FOREIGN KEY (post_id) REFERENCES community_posts(id) ON DELETE CASCADE,
  CONSTRAINT unique_user_post UNIQUE(user_id, post_id)
);

-- 7. Create indexes for community_saved_posts
CREATE INDEX IF NOT EXISTS community_saved_posts_user_id_idx ON community_saved_posts(user_id);
CREATE INDEX IF NOT EXISTS community_saved_posts_post_id_idx ON community_saved_posts(post_id);
CREATE INDEX IF NOT EXISTS community_saved_posts_created_at_idx ON community_saved_posts(created_at DESC);

-- 8. Create community_moderation_queue table
CREATE TABLE IF NOT EXISTS community_moderation_queue (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  post_id TEXT NOT NULL,
  reason TEXT NOT NULL,
  reporter_id TEXT,
  status TEXT DEFAULT 'PENDING',
  reviewed_by TEXT,
  reviewed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT fk_post FOREIGN KEY (post_id) REFERENCES community_posts(id) ON DELETE CASCADE,
  CONSTRAINT fk_reporter FOREIGN KEY (reporter_id) REFERENCES users(id) ON DELETE SET NULL,
  CONSTRAINT fk_reviewer FOREIGN KEY (reviewed_by) REFERENCES users(id) ON DELETE SET NULL
);

-- 9. Create indexes for moderation queue
CREATE INDEX IF NOT EXISTS community_moderation_queue_post_id_idx ON community_moderation_queue(post_id);
CREATE INDEX IF NOT EXISTS community_moderation_queue_status_idx ON community_moderation_queue(status);
CREATE INDEX IF NOT EXISTS community_moderation_queue_created_at_idx ON community_moderation_queue(created_at DESC);

-- 10. Add followers/following counts to user_profiles
ALTER TABLE user_profiles
ADD COLUMN IF NOT EXISTS followers_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS following_count INTEGER DEFAULT 0;

-- 11. Create function to update trending score
CREATE OR REPLACE FUNCTION update_trending_scores()
RETURNS void AS $$
BEGIN
  UPDATE community_posts
  SET trending_score = (
    (likes_count * 4) +
    (comments_count * 3) +
    (views_count * 1) -
    (EXTRACT(EPOCH FROM (NOW() - created_at)) / 3600 * 0.5)
  )
  WHERE created_at >= NOW() - INTERVAL '7 days'
    AND is_approved = true;
END;
$$ LANGUAGE plpgsql;

-- 12. Create rate limiting table
CREATE TABLE IF NOT EXISTS rate_limits (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT NOT NULL,
  action TEXT NOT NULL,
  count INTEGER DEFAULT 1,
  window_start TIMESTAMP DEFAULT NOW(),
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 13. Create indexes for rate_limits
CREATE INDEX IF NOT EXISTS rate_limits_user_action_idx ON rate_limits(user_id, action);
CREATE INDEX IF NOT EXISTS rate_limits_window_start_idx ON rate_limits(window_start);

-- Migration complete
