-- Phase 2: Collaboration Engine + Profile System
-- Migration SQL for PostgreSQL

-- 1. Create RequestStatus enum
CREATE TYPE request_status_enum AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- 2. Extend user_profiles table with reputation fields
ALTER TABLE user_profiles
ADD COLUMN IF NOT EXISTS reputation_score INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_posts INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_likes_received INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_collaborations INTEGER DEFAULT 0;

-- 3. Create index on reputation_score
CREATE INDEX IF NOT EXISTS user_profiles_reputation_score_idx ON user_profiles(reputation_score DESC);

-- 4. Create community_collaboration_requests table
CREATE TABLE IF NOT EXISTS community_collaboration_requests (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  post_id TEXT NOT NULL,
  requester_id TEXT NOT NULL,
  status request_status_enum DEFAULT 'PENDING',
  created_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT fk_post FOREIGN KEY (post_id) REFERENCES community_posts(id) ON DELETE CASCADE,
  CONSTRAINT fk_requester FOREIGN KEY (requester_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT unique_post_requester UNIQUE(post_id, requester_id)
);

-- 5. Create indexes for collaboration_requests
CREATE INDEX IF NOT EXISTS community_collaboration_requests_post_id_idx ON community_collaboration_requests(post_id);
CREATE INDEX IF NOT EXISTS community_collaboration_requests_requester_id_idx ON community_collaboration_requests(requester_id);
CREATE INDEX IF NOT EXISTS community_collaboration_requests_status_idx ON community_collaboration_requests(status);

-- 6. Add likes_count to community_comments
ALTER TABLE community_comments
ADD COLUMN IF NOT EXISTS likes_count INTEGER DEFAULT 0;

-- 7. Create community_comment_reactions table
CREATE TABLE IF NOT EXISTS community_comment_reactions (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT NOT NULL,
  comment_id TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT fk_comment FOREIGN KEY (comment_id) REFERENCES community_comments(id) ON DELETE CASCADE,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT unique_user_comment UNIQUE(user_id, comment_id)
);

-- 8. Create indexes for comment_reactions
CREATE INDEX IF NOT EXISTS community_comment_reactions_comment_id_idx ON community_comment_reactions(comment_id);
CREATE INDEX IF NOT EXISTS community_comment_reactions_user_id_idx ON community_comment_reactions(user_id);

-- Migration complete
