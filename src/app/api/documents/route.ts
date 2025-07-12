import { NextRequest, NextResponse } from "next/server";
import { Document, CreateDocumentRequest } from "@/types";

// Mock data
const documents: Document[] = [
  {
    id: "1",
    title: "Marketing Strategy Q1 2025",
    type: "document",
    category: "business",
    content:
      "This comprehensive marketing strategy outlines our approach for Q1 2025, focusing on digital transformation, customer engagement, and market expansion. Key initiatives include social media campaigns, influencer partnerships, and data-driven decision making.",
    createdAt: "2025-01-15T10:30:00Z",
    aiGenerated: true,
    tags: ["marketing", "strategy", "Q1"],
  },
  {
    id: "2",
    title: "Financial Budget Analysis",
    type: "spreadsheet",
    category: "business",
    content:
      "Detailed financial analysis including revenue projections, expense tracking, and budget allocation across departments. This spreadsheet provides comprehensive insights into our financial performance and future planning.",
    createdAt: "2025-01-14T14:20:00Z",
    aiGenerated: false,
    tags: ["finance", "budget", "analysis"],
  },
  {
    id: "3",
    title: "Product Launch Presentation",
    type: "slide",
    category: "business",
    content:
      "Presentation slides for the upcoming product launch event. Includes market research, competitive analysis, pricing strategy, and go-to-market plan with detailed timelines and milestones.",
    createdAt: "2025-01-13T09:15:00Z",
    aiGenerated: true,
    tags: ["product", "launch", "presentation"],
  },
  {
    id: "4",
    title: "Personal Goals 2025",
    type: "document",
    category: "personal",
    content:
      "Personal development goals and action plans for 2025. Focus areas include career advancement, health and fitness, learning new skills, and maintaining work-life balance.",
    createdAt: "2025-01-12T16:45:00Z",
    aiGenerated: false,
    tags: ["personal", "goals", "development"],
  },
  {
    id: "5",
    title: "Research Paper: AI in Healthcare",
    type: "document",
    category: "academic",
    content:
      "Comprehensive research paper exploring the applications of artificial intelligence in healthcare. Covers machine learning algorithms, diagnostic tools, treatment optimization, and ethical considerations.",
    createdAt: "2025-01-11T11:30:00Z",
    aiGenerated: true,
    tags: ["research", "AI", "healthcare", "academic"],
  },
  {
    id: "6",
    title: "Sales Performance Dashboard",
    type: "spreadsheet",
    category: "business",
    content:
      "Interactive dashboard tracking sales performance metrics, including revenue growth, customer acquisition costs, conversion rates, and regional performance analysis.",
    createdAt: "2025-01-10T13:25:00Z",
    aiGenerated: false,
    tags: ["sales", "performance", "dashboard"],
  },
];

export async function GET() {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json(documents);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch documents" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateDocumentRequest = await request.json();

    // Validate required fields
    if (!body.title || !body.type || !body.category || !body.prompt) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Simulate AI generation delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate mock AI content based on prompt
    const generateContent = (prompt: string, type: string) => {
      const baseContent = `This ${type} was generated based on the prompt: "${prompt}". It contains comprehensive information and follows best practices for ${type} creation.`;

      switch (type) {
        case "document":
          return `${baseContent}\n\nThis document includes detailed sections covering all aspects of the requested topic, with proper formatting and structure.`;
        case "slide":
          return `${baseContent}\n\nThis presentation includes multiple slides with key points, visual elements, and engaging content for effective communication.`;
        case "spreadsheet":
          return `${baseContent}\n\nThis spreadsheet contains organized data with formulas, charts, and analysis tools for comprehensive data management.`;
        default:
          return baseContent;
      }
    };

    // Generate tags from title and category
    const generateTags = (title: string, category: string) => {
      const words = title.toLowerCase().split(" ");
      const categoryTag = category;
      const typeTags = words.filter((word) => word.length > 3);
      return [categoryTag, ...typeTags.slice(0, 2)];
    };

    const newDocument: Document = {
      id: (documents.length + 1).toString(),
      title: body.title,
      type: body.type,
      category: body.category,
      content: generateContent(body.prompt, body.type),
      createdAt: new Date().toISOString(),
      aiGenerated: true,
      tags: generateTags(body.title, body.category),
    };

    documents.unshift(newDocument);

    return NextResponse.json(newDocument, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create document" },
      { status: 500 }
    );
  }
}
