-- Create ENUMS
CREATE TYPE post_type_enum AS ENUM ('IDEA', 'COLLABORATION');
CREATE TYPE difficulty_enum AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT');
CREATE TYPE reaction_type_enum AS ENUM ('LIKE', 'DISLIKE');
CREATE TYPE collaboration_status_enum AS ENUM ('OPEN', 'CLOSED');

-- Create community_posts table
CREATE TABLE community_posts (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type post_type_enum NOT NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  domain TEXT NOT NULL,
  difficulty difficulty_enum NOT NULL,
  tech_stack JSONB DEFAULT '[]'::jsonb,
  tags JSONB DEFAULT '[]'::jsonb,
  estimated_duration TEXT,
  views_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  dislikes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  trending_score DECIMAL(10,2) DEFAULT 0,
  status collaboration_status_enum DEFAULT 'OPEN',
  required_collaborators INTEGER,
  current_collaborators INTEGER DEFAULT 0,
  required_skills JSONB DEFAULT '[]'::jsonb,
  is_anonymous BOOLEAN DEFAULT false,
  is_approved BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for community_posts
CREATE INDEX idx_community_posts_domain ON community_posts(domain);
CREATE INDEX idx_community_posts_difficulty ON community_posts(difficulty);
CREATE INDEX idx_community_posts_created_at ON community_posts(created_at DESC);
CREATE INDEX idx_community_posts_trending_score ON community_posts(trending_score DESC);
CREATE INDEX idx_community_posts_likes_count ON community_posts(likes_count DESC);
CREATE INDEX idx_community_posts_type ON community_posts(type);
CREATE INDEX idx_community_posts_status ON community_posts(status);
CREATE INDEX idx_community_posts_user_id ON community_posts(user_id);

-- Create community_reactions table
CREATE TABLE community_reactions (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  post_id TEXT NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
  type reaction_type_enum NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, post_id)
);

-- Create indexes for community_reactions
CREATE INDEX idx_community_reactions_post_id ON community_reactions(post_id);
CREATE INDEX idx_community_reactions_user_id ON community_reactions(user_id);

-- Create community_comments table
CREATE TABLE community_comments (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  post_id TEXT NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  parent_id TEXT REFERENCES community_comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for community_comments
CREATE INDEX idx_community_comments_post_id ON community_comments(post_id);
CREATE INDEX idx_community_comments_parent_id ON community_comments(parent_id);
CREATE INDEX idx_community_comments_user_id ON community_comments(user_id);
CREATE INDEX idx_community_comments_created_at ON community_comments(created_at DESC);

-- Create view tracking table
CREATE TABLE community_post_views (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  post_id TEXT NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(post_id, user_id, created_at)
);

CREATE INDEX idx_community_post_views_post_id ON community_post_views(post_id);
CREATE INDEX idx_community_post_views_created_at ON community_post_views(created_at DESC);

-- Function to update trending score
CREATE OR REPLACE FUNCTION update_trending_score()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE community_posts
  SET trending_score = (
    (likes_count * 4) +
    (comments_count * 3) +
    (views_count * 1) -
    (EXTRACT(EPOCH FROM (NOW() - created_at)) / 3600 * 0.5)
  )
  WHERE id = NEW.id OR id = NEW.post_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for auto-updating trending score
CREATE TRIGGER update_post_trending_score
AFTER INSERT OR UPDATE ON community_posts
FOR EACH ROW
EXECUTE FUNCTION update_trending_score();

CREATE TRIGGER update_reaction_trending_score
AFTER INSERT OR DELETE ON community_reactions
FOR EACH ROW
EXECUTE FUNCTION update_trending_score();

CREATE TRIGGER update_comment_trending_score
AFTER INSERT ON community_comments
FOR EACH ROW
EXECUTE FUNCTION update_trending_score();
