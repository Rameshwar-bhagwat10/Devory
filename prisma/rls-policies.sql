-- Row Level Security Policies for Devory
-- Run this after migrations to enable RLS

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE idea_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE idea_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_usage_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE editor_picks ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY "Users can read their own data"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own data"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- User profiles policies
CREATE POLICY "Users can read their own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- Projects policies (public read, admin write)
CREATE POLICY "Anyone can read published projects"
  ON projects FOR SELECT
  USING (is_published = true);

CREATE POLICY "Admins can manage projects"
  ON projects FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'ADMIN'
    )
  );

-- Saved projects policies
CREATE POLICY "Users can read their own saved projects"
  ON saved_projects FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can save projects"
  ON saved_projects FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unsave projects"
  ON saved_projects FOR DELETE
  USING (auth.uid() = user_id);

-- Community ideas policies
CREATE POLICY "Anyone can read approved ideas"
  ON community_ideas FOR SELECT
  USING (status = 'APPROVED');

CREATE POLICY "Users can read their own ideas"
  ON community_ideas FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create ideas"
  ON community_ideas FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage all ideas"
  ON community_ideas FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'ADMIN'
    )
  );

-- Idea reactions policies
CREATE POLICY "Users can read all reactions"
  ON idea_reactions FOR SELECT
  USING (true);

CREATE POLICY "Users can manage their own reactions"
  ON idea_reactions FOR ALL
  USING (auth.uid() = user_id);

-- Idea reports policies
CREATE POLICY "Users can create reports"
  ON idea_reports FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can read all reports"
  ON idea_reports FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'ADMIN'
    )
  );

CREATE POLICY "Admins can update reports"
  ON idea_reports FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'ADMIN'
    )
  );

-- AI usage logs policies
CREATE POLICY "Users can read their own AI logs"
  ON ai_usage_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "System can create AI logs"
  ON ai_usage_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Downloads policies
CREATE POLICY "Users can read their own downloads"
  ON downloads FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create downloads"
  ON downloads FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Subscriptions policies
CREATE POLICY "Users can read their own subscription"
  ON subscriptions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscription"
  ON subscriptions FOR UPDATE
  USING (auth.uid() = user_id);

-- Editor picks policies (public read, admin write)
CREATE POLICY "Anyone can read editor picks"
  ON editor_picks FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage editor picks"
  ON editor_picks FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'ADMIN'
    )
  );

-- Audit logs policies (admin only)
CREATE POLICY "Admins can read audit logs"
  ON audit_logs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'ADMIN'
    )
  );

CREATE POLICY "System can create audit logs"
  ON audit_logs FOR INSERT
  WITH CHECK (true);
