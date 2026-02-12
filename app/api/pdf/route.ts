import { NextRequest } from 'next/server';
import { withAuth, apiError } from '@/lib/api-guards';
import { prisma } from '@/lib/prisma';
import { jsPDF } from 'jspdf';

// Rate limit: 5 downloads per hour
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in ms
const MAX_DOWNLOADS_PER_HOUR = 5;

const DOMAIN_LABELS: Record<string, string> = {
  WEB_DEVELOPMENT: 'Web Development',
  MOBILE_DEVELOPMENT: 'Mobile Development',
  BACKEND_DEVELOPMENT: 'Backend Development',
  DESKTOP_DEVELOPMENT: 'Desktop Development',
  DATA_SCIENCE: 'Data Science',
  MACHINE_LEARNING: 'Machine Learning',
  BLOCKCHAIN: 'Blockchain',
  IOT: 'IoT',
  GAME_DEVELOPMENT: 'Game Development',
  CYBERSECURITY: 'Cybersecurity',
  CLOUD_COMPUTING: 'Cloud Computing',
  FINTECH: 'FinTech',
  DEVOPS: 'DevOps',
  HEALTH_TECH: 'Health Tech',
  ENTERPRISE_SYSTEM: 'Enterprise System',
  AI_ML: 'AI & ML',
  EDTECH: 'EdTech',
  MOBILE: 'Mobile',
  DEVELOPER_TOOLS: 'Developer Tools',
  AI: 'AI',
  AR_VR: 'AR/VR',
  ROBOTICS: 'Robotics',
  COMPUTER_VISION: 'Computer Vision',
  ENERGY: 'Energy',
  QUANTUM: 'Quantum',
  BIOINFORMATICS: 'Bioinformatics',
  ENVIRONMENTAL: 'Environmental',
  OTHER: 'Other',
};

export async function POST(request: NextRequest) {
  return withAuth(async (session) => {
    try {
      const { projectId } = await request.json();

      if (!projectId) {
        return apiError('Project ID is required', 400);
      }

      // Check rate limit
      const oneHourAgo = new Date(Date.now() - RATE_LIMIT_WINDOW);
      const recentDownloads = await prisma.download.count({
        where: {
          userId: session.user!.id,
          createdAt: { gte: oneHourAgo },
        },
      });

      if (recentDownloads >= MAX_DOWNLOADS_PER_HOUR) {
        return apiError('Rate limit exceeded. Maximum 5 downloads per hour.', 429);
      }

      // Fetch project details
      const project = await prisma.project.findUnique({
        where: { id: projectId },
      });

      if (!project) {
        return apiError('Project not found', 404);
      }

      // Log download
      await prisma.download.create({
        data: {
          userId: session.user!.id,
          projectId,
          format: 'PDF',
        },
      });

      // Generate PDF
      const pdfBuffer = generatePDF(project);

      return new Response(pdfBuffer as any, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${project.slug}.pdf"`,
        },
      });
    } catch (error) {
      console.error('PDF generation error:', error);
      return apiError('Failed to generate PDF', 500);
    }
  });
}

function generatePDF(project: any): Buffer {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  let yPos = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const maxWidth = pageWidth - 2 * margin;
  const contentWidth = maxWidth - 10;

  // Color palette
  const colors = {
    primary: '#fb923c',      // Orange
    secondary: '#f97316',    // Darker orange
    dark: '#1a1a1a',         // Dark text
    gray: '#666666',         // Gray text
    lightGray: '#999999',    // Light gray
    background: '#f8f8f8',   // Light background
  };

  // Helper function to check if we need a new page
  const checkPageBreak = (requiredSpace: number) => {
    if (yPos + requiredSpace > pageHeight - 20) {
      doc.addPage();
      yPos = 20;
      return true;
    }
    return false;
  };

  // Helper function to add a colored box
  const addColoredBox = (x: number, y: number, width: number, height: number, color: string) => {
    doc.setFillColor(color);
    doc.rect(x, y, width, height, 'F');
  };

  // Helper function to add text with word wrap
  const addText = (text: string, fontSize: number, color: string, isBold: boolean = false, indent: number = 0) => {
    doc.setFontSize(fontSize);
    doc.setTextColor(color);
    doc.setFont('helvetica', isBold ? 'bold' : 'normal');
    
    const lines = doc.splitTextToSize(text, contentWidth - indent);
    lines.forEach((line: string) => {
      checkPageBreak(fontSize * 0.5 + 2);
      doc.text(line, margin + indent, yPos);
      yPos += fontSize * 0.5;
    });
    yPos += 2;
  };

  // Helper function to add section header with underline
  const addSectionHeader = (title: string) => {
    checkPageBreak(15);
    yPos += 5;
    
    // Add colored bar
    addColoredBox(margin, yPos - 4, 3, 8, colors.primary);
    
    doc.setFontSize(16);
    doc.setTextColor(colors.dark);
    doc.setFont('helvetica', 'bold');
    doc.text(title, margin + 6, yPos);
    yPos += 8;
    
    // Add subtle line
    doc.setDrawColor(colors.primary);
    doc.setLineWidth(0.5);
    doc.line(margin, yPos, margin + 40, yPos);
    yPos += 6;
  };

  // Helper function to add a badge
  const addBadge = (text: string, x: number, y: number, bgColor: string, textColor: string = '#ffffff') => {
    doc.setFillColor(bgColor);
    doc.roundedRect(x, y - 4, doc.getTextWidth(text) + 8, 7, 2, 2, 'F');
    doc.setFontSize(9);
    doc.setTextColor(textColor);
    doc.setFont('helvetica', 'bold');
    doc.text(text, x + 4, y);
  };

  // Parse tech stack
  const techStackData = project.techStack as { frontend?: string[]; backend?: string[]; database?: string[]; tools?: string[] };
  const allTech = [
    ...(techStackData.frontend || []),
    ...(techStackData.backend || []),
    ...(techStackData.database || []),
    ...(techStackData.tools || []),
  ];

  // ============================================
  // HEADER - Brand Banner
  // ============================================
  addColoredBox(0, 0, pageWidth, 35, colors.primary);
  
  // Logo/Brand
  doc.setFontSize(32);
  doc.setTextColor('#ffffff');
  doc.setFont('helvetica', 'bold');
  doc.text('DEVORY', pageWidth / 2, 15, { align: 'center' });
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('Project Idea Document', pageWidth / 2, 23, { align: 'center' });
  
  yPos = 45;

  // ============================================
  // PROJECT TITLE
  // ============================================
  doc.setFontSize(24);
  doc.setTextColor(colors.dark);
  doc.setFont('helvetica', 'bold');
  const titleLines = doc.splitTextToSize(project.title, maxWidth);
  titleLines.forEach((line: string) => {
    doc.text(line, margin, yPos);
    yPos += 9;
  });
  yPos += 3;

  // ============================================
  // METADATA BADGES
  // ============================================
  let badgeX = margin;
  const badgeY = yPos;
  
  // Difficulty badge
  const difficultyColors: Record<string, string> = {
    BEGINNER: '#10b981',
    INTERMEDIATE: '#f59e0b',
    ADVANCED: '#ef4444',
    EXPERT: '#8b5cf6',
  };
  addBadge(project.difficulty, badgeX, badgeY, difficultyColors[project.difficulty] || colors.primary);
  badgeX += doc.getTextWidth(project.difficulty) + 12;
  
  // Domain badge
  const domainLabel = DOMAIN_LABELS[project.domain] || project.domain;
  addBadge(domainLabel, badgeX, badgeY, colors.secondary);
  
  yPos += 10;

  // ============================================
  // METADATA TABLE
  // ============================================
  checkPageBreak(25);
  
  // Background box for metadata
  addColoredBox(margin, yPos, maxWidth, 22, colors.background);
  
  yPos += 6;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(colors.gray);
  
  // Duration
  doc.text('Duration:', margin + 3, yPos);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.dark);
  doc.text(project.estimatedDuration, margin + 25, yPos);
  
  yPos += 6;
  
  // Primary Technology
  if (project.primaryTechnology) {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(colors.gray);
    doc.text('Primary Tech:', margin + 3, yPos);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(colors.dark);
    doc.text(project.primaryTechnology, margin + 30, yPos);
  }
  
  yPos += 6;
  
  // Estimated Hours
  if (project.estimatedHours) {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(colors.gray);
    doc.text('Est. Hours:', margin + 3, yPos);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(colors.dark);
    doc.text(`${project.estimatedHours} hours`, margin + 25, yPos);
  }
  
  yPos += 12;

  // ============================================
  // DESCRIPTION
  // ============================================
  addSectionHeader('PROJECT OVERVIEW');
  addText(project.shortDescription, 11, colors.dark, false);
  
  if (project.fullDescription) {
    yPos += 2;
    addText(project.fullDescription, 10, colors.gray, false);
  }

  // ============================================
  // TECH STACK
  // ============================================
  if (allTech.length > 0) {
    addSectionHeader('TECHNOLOGY STACK');
    
    const techCategories = [
      { label: 'Frontend', items: techStackData.frontend },
      { label: 'Backend', items: techStackData.backend },
      { label: 'Database', items: techStackData.database },
      { label: 'Tools', items: techStackData.tools },
    ];
    
    techCategories.forEach(category => {
      if (category.items && category.items.length > 0) {
        checkPageBreak(10);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(colors.primary);
        doc.text(`${category.label}:`, margin, yPos);
        yPos += 5;
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(colors.dark);
        
        // Display as comma-separated list
        const techList = category.items.join(', ');
        const lines = doc.splitTextToSize(techList, contentWidth - 5);
        lines.forEach((line: string) => {
          checkPageBreak(5);
          doc.text(line, margin + 5, yPos);
          yPos += 5;
        });
        yPos += 2;
      }
    });
  }

  // ============================================
  // KEY FEATURES
  // ============================================
  const features = project.features as string[];
  if (features && features.length > 0) {
    addSectionHeader('KEY FEATURES');
    
    features.forEach((feature, index) => {
      checkPageBreak(12);
      
      // Number circle
      doc.setFillColor(colors.primary);
      doc.circle(margin + 3, yPos - 2, 3, 'F');
      doc.setFontSize(9);
      doc.setTextColor('#ffffff');
      doc.setFont('helvetica', 'bold');
      doc.text((index + 1).toString(), margin + 3, yPos, { align: 'center' });
      
      // Feature text
      doc.setFontSize(10);
      doc.setTextColor(colors.dark);
      doc.setFont('helvetica', 'normal');
      const featureLines = doc.splitTextToSize(feature, contentWidth - 10);
      featureLines.forEach((line: string, lineIndex: number) => {
        doc.text(line, margin + 8, yPos + (lineIndex * 5));
      });
      yPos += featureLines.length * 5 + 3;
    });
  }

  // ============================================
  // ARCHITECTURE
  // ============================================
  if (project.architecture) {
    addSectionHeader('SYSTEM ARCHITECTURE');
    
    // Background box
    checkPageBreak(20);
    const archLines = doc.splitTextToSize(project.architecture, contentWidth - 6);
    const boxHeight = archLines.length * 5 + 8;
    
    addColoredBox(margin, yPos, maxWidth, boxHeight, colors.background);
    yPos += 5;
    
    doc.setFontSize(10);
    doc.setTextColor(colors.dark);
    doc.setFont('helvetica', 'normal');
    archLines.forEach((line: string) => {
      doc.text(line, margin + 3, yPos);
      yPos += 5;
    });
    yPos += 8;
  }

  // ============================================
  // SKILLS REQUIRED
  // ============================================
  const skills = project.skillsRequired as string[];
  if (skills && skills.length > 0) {
    addSectionHeader('SKILLS REQUIRED');
    
    skills.forEach((skill) => {
      checkPageBreak(8);
      
      // Bullet point
      doc.setFillColor(colors.primary);
      doc.circle(margin + 2, yPos - 1.5, 1.5, 'F');
      
      // Skill text
      doc.setFontSize(10);
      doc.setTextColor(colors.dark);
      doc.setFont('helvetica', 'normal');
      const skillLines = doc.splitTextToSize(skill, contentWidth - 8);
      skillLines.forEach((line: string, lineIndex: number) => {
        doc.text(line, margin + 6, yPos + (lineIndex * 5));
      });
      yPos += skillLines.length * 5 + 2;
    });
  }

  // ============================================
  // LEARNING OUTCOMES
  // ============================================
  const outcomes = project.learningOutcomes as string[];
  if (outcomes && outcomes.length > 0) {
    addSectionHeader('LEARNING OUTCOMES');
    
    outcomes.forEach((outcome) => {
      checkPageBreak(8);
      
      // Checkmark icon (simplified)
      doc.setDrawColor(colors.primary);
      doc.setLineWidth(0.8);
      doc.line(margin + 1, yPos - 1, margin + 2, yPos);
      doc.line(margin + 2, yPos, margin + 4, yPos - 3);
      
      // Outcome text
      doc.setFontSize(10);
      doc.setTextColor(colors.dark);
      doc.setFont('helvetica', 'normal');
      const outcomeLines = doc.splitTextToSize(outcome, contentWidth - 8);
      outcomeLines.forEach((line: string, lineIndex: number) => {
        doc.text(line, margin + 6, yPos + (lineIndex * 5));
      });
      yPos += outcomeLines.length * 5 + 2;
    });
  }

  // ============================================
  // PROJECT TIMELINE
  // ============================================
  const timeline = project.timeline as Array<{ week: number; title: string; description: string }>;
  if (timeline && timeline.length > 0) {
    addSectionHeader('PROJECT TIMELINE');
    
    timeline.forEach((item, index) => {
      checkPageBreak(20);
      
      // Week badge
      addBadge(`Week ${item.week}`, margin, yPos, colors.primary);
      yPos += 8;
      
      // Title
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(colors.dark);
      const titleLines = doc.splitTextToSize(item.title, contentWidth - 5);
      titleLines.forEach((line: string) => {
        doc.text(line, margin + 5, yPos);
        yPos += 5.5;
      });
      
      // Description
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(colors.gray);
      const descLines = doc.splitTextToSize(item.description, contentWidth - 5);
      descLines.forEach((line: string) => {
        doc.text(line, margin + 5, yPos);
        yPos += 5;
      });
      
      // Separator line (except for last item)
      if (index < timeline.length - 1) {
        yPos += 2;
        doc.setDrawColor(colors.lightGray);
        doc.setLineWidth(0.3);
        doc.line(margin, yPos, margin + maxWidth, yPos);
        yPos += 5;
      } else {
        yPos += 5;
      }
    });
  }

  // ============================================
  // FOOTER
  // ============================================
  const addFooter = (pageNum: number) => {
    const footerY = pageHeight - 10;
    
    // Footer line
    doc.setDrawColor(colors.primary);
    doc.setLineWidth(0.5);
    doc.line(margin, footerY - 3, pageWidth - margin, footerY - 3);
    
    // Footer text
    doc.setFontSize(8);
    doc.setTextColor(colors.lightGray);
    doc.setFont('helvetica', 'normal');
    doc.text('Generated by Devory - https://devory.com', margin, footerY);
    doc.text(`Page ${pageNum}`, pageWidth - margin, footerY, { align: 'right' });
  };

  // Add footer to all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    addFooter(i);
  }

  return Buffer.from(doc.output('arraybuffer'));
}
