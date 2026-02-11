import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome to Devory - Onboarding",
  description: "Complete your profile setup",
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
