interface EmojiCategory {
  name: string;
  keywords: string[];
  color: string;
  emoji: string;
}

export const categories: EmojiCategory[] = [
  {
    name: "Work",
    keywords: [
      "work",
      "job",
      "office",
      "project",
      "meeting",
      "presentation",
      "deadline",
      "email",
      "report",
      "business",
      "client",
    ],
    color: "#3B82F6",
    emoji: "💼",
  },
  {
    name: "Personal",
    keywords: [
      "personal",
      "self",
      "hobby",
      "me",
      "myself",
      "habit",
      "journal",
      "diary",
      "reflect",
    ],
    color: "#F87171",
    emoji: "🧘",
  },
  {
    name: "Shopping",
    keywords: [
      "shopping",
      "buy",
      "purchase",
      "store",
      "groceries",
      "market",
      "mall",
      "online",
      "amazon",
      "shop",
      "food",
    ],
    color: "#10B981",
    emoji: "🛒",
  },
  {
    name: "Health",
    keywords: [
      "health",
      "exercise",
      "workout",
      "gym",
      "fitness",
      "doctor",
      "appointment",
      "medicine",
      "vitamin",
      "diet",
      "run",
      "jog",
    ],
    color: "#8B5CF6",
    emoji: "💪",
  },
  {
    name: "Finance",
    keywords: [
      "finance",
      "money",
      "bank",
      "budget",
      "invest",
      "saving",
      "tax",
      "bill",
      "pay",
      "subscription",
      "expense",
    ],
    color: "#F59E0B",
    emoji: "💰",
  },
  {
    name: "Social",
    keywords: [
      "social",
      "friend",
      "party",
      "event",
      "birthday",
      "celebration",
      "dinner",
      "date",
      "meet",
      "call",
      "text",
      "message",
    ],
    color: "#EC4899",
    emoji: "🎉",
  },
  {
    name: "Education",
    keywords: [
      "education",
      "school",
      "study",
      "learn",
      "course",
      "book",
      "read",
      "homework",
      "assignment",
      "class",
      "lecture",
      "test",
      "exam",
    ],
    color: "#6366F1",
    emoji: "📚",
  },
];

const emojiMap: Record<string, string> = {
  // Work
  meeting: "📅",
  email: "📧",
  presentation: "📊",
  project: "📝",
  call: "📞",
  deadline: "⏰",
  report: "📑",
  client: "🤝",

  // Personal
  hobby: "🎨",
  journal: "📓",
  reflection: "🪞",
  habit: "✨",
  meditate: "🧘",
  relax: "🛌",

  // Shopping
  grocery: "🥦",
  clothes: "👕",
  shoes: "👟",
  electronics: "📱",
  gift: "🎁",
  food: "🍎",

  // Health
  workout: "🏋️",
  run: "🏃",
  gym: "💪",
  doctor: "👨‍⚕️",
  medicine: "💊",
  diet: "🥗",
  sleep: "😴",
  water: "💧",
  yoga: "🧘‍♀️",

  // Finance
  bank: "🏦",
  invest: "📈",
  budget: "💵",
  bill: "💸",
  save: "💰",
  tax: "📊",

  // Social
  party: "🎉",
  friend: "👥",
  birthday: "🎂",
  dinner: "🍽️",
  date: "❤️",
  message: "💬",

  // Education
  study: "📚",
  homework: "📝",
  book: "📖",
  read: "📑",
  test: "✍️",
  exam: "📝",
  course: "🎓",
};

export function findCategoryByText(text: string): EmojiCategory | null {
  const lowerText = text.toLowerCase();

  // First try exact match on keywords
  for (const category of categories) {
    if (category.keywords.some((keyword) => lowerText.includes(keyword))) {
      return category;
    }
  }

  // If no exact match, try to match based on word patterns
  const words = lowerText.split(/\s+/);
  for (const category of categories) {
    for (const word of words) {
      if (
        word.length > 3 &&
        category.keywords.some(
          (keyword) => keyword.includes(word) || word.includes(keyword)
        )
      ) {
        return category;
      }
    }
  }

  // Default to Work category if no match
  return categories[0];
}

export function findEmojiByText(text: string): string {
  const lowerText = text.toLowerCase();
  const words = lowerText.split(/\s+/);

  // Try to find an emoji for any word
  for (const word of words) {
    for (const [keyword, emoji] of Object.entries(emojiMap)) {
      if (word.includes(keyword) || keyword.includes(word)) {
        return emoji;
      }
    }
  }

  // If no specific emoji is found, use the category emoji
  const category = findCategoryByText(text);
  return category ? category.emoji : "✅";
}
