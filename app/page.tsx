"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  User,
  Menu,
  ChevronUp,
  ChevronDown,
  MessageSquare,
  Eye,
  Clock,
  Award,
  TrendingUp,
  Plus,
  Filter,
  CheckCircle,
  Send,
  Bookmark,
  Share2,
  Flag,
  Edit,
  Trash2,
} from "lucide-react"

interface Question {
  id: number
  title: string
  content: string
  author: {
    id: number
    name: string
    avatar: string
    reputation: number
    badge?: string
  }
  tags: string[]
  votes: number
  answers: number
  views: number
  createdAt: string
  isAnswered: boolean
  isFeatured?: boolean
}

interface Answer {
  id: number
  content: string
  author: {
    id: number
    name: string
    avatar: string
    reputation: number
    badge?: string
  }
  votes: number
  isAccepted: boolean
  createdAt: string
}

interface UserProfile {
  id: number
  name: string
  email: string
  avatar: string
  reputation: number
  badge?: string
  questionsAsked: number
  answersGiven: number
  joinDate: string
}

export default function QAForum() {
  const [currentPage, setCurrentPage] = useState("home")
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>({
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    avatar: "/placeholder.svg?height=100&width=100",
    reputation: 1250,
    badge: "Gold",
    questionsAsked: 15,
    answersGiven: 42,
    joinDate: "2023-01-15",
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  const categories = [
    { id: "all", name: "All Questions", count: 1234 },
    { id: "javascript", name: "JavaScript", count: 456 },
    { id: "react", name: "React", count: 234 },
    { id: "python", name: "Python", count: 345 },
    { id: "nodejs", name: "Node.js", count: 123 },
    { id: "css", name: "CSS", count: 189 },
    { id: "html", name: "HTML", count: 167 },
    { id: "database", name: "Database", count: 98 },
  ]

  const questions: Question[] = [
    {
      id: 1,
      title: "How to implement authentication in React with JWT tokens?",
      content:
        "I'm building a React application and need to implement user authentication using JWT tokens. What's the best approach for storing tokens securely and handling token refresh?",
      author: {
        id: 2,
        name: "Alice Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        reputation: 2340,
        badge: "Gold",
      },
      tags: ["react", "javascript", "authentication", "jwt"],
      votes: 15,
      answers: 3,
      views: 234,
      createdAt: "2024-01-20T10:30:00Z",
      isAnswered: true,
      isFeatured: true,
    },
    {
      id: 2,
      title: "Python list comprehension vs for loop performance",
      content:
        "I've heard that list comprehensions are faster than regular for loops in Python. Can someone explain why this is the case and provide some benchmarks?",
      author: {
        id: 3,
        name: "Bob Smith",
        avatar: "/placeholder.svg?height=40&width=40",
        reputation: 890,
        badge: "Silver",
      },
      tags: ["python", "performance", "list-comprehension"],
      votes: 8,
      answers: 2,
      views: 156,
      createdAt: "2024-01-19T15:45:00Z",
      isAnswered: true,
    },
    {
      id: 3,
      title: "CSS Grid vs Flexbox: When to use which?",
      content:
        "I'm confused about when to use CSS Grid and when to use Flexbox. Can someone explain the differences and provide examples of when each is most appropriate?",
      author: {
        id: 4,
        name: "Carol Davis",
        avatar: "/placeholder.svg?height=40&width=40",
        reputation: 1560,
        badge: "Gold",
      },
      tags: ["css", "grid", "flexbox", "layout"],
      votes: 12,
      answers: 5,
      views: 445,
      createdAt: "2024-01-18T09:15:00Z",
      isAnswered: true,
    },
    {
      id: 4,
      title: "How to optimize database queries in Node.js?",
      content:
        "My Node.js application is running slow due to database queries. What are some best practices for optimizing database performance?",
      author: {
        id: 5,
        name: "David Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
        reputation: 670,
        badge: "Bronze",
      },
      tags: ["nodejs", "database", "performance", "optimization"],
      votes: 6,
      answers: 1,
      views: 89,
      createdAt: "2024-01-17T14:20:00Z",
      isAnswered: false,
    },
    {
      id: 5,
      title: "Understanding React hooks lifecycle",
      content:
        "I'm new to React hooks and struggling to understand the lifecycle. How do useEffect, useState, and other hooks work together?",
      author: {
        id: 6,
        name: "Eva Brown",
        avatar: "/placeholder.svg?height=40&width=40",
        reputation: 340,
        badge: "Bronze",
      },
      tags: ["react", "hooks", "lifecycle", "useeffect"],
      votes: 4,
      answers: 0,
      views: 67,
      createdAt: "2024-01-16T11:30:00Z",
      isAnswered: false,
    },
  ]

  const answers: Answer[] = [
    {
      id: 1,
      content: `For JWT authentication in React, here's a comprehensive approach:

**1. Token Storage:**
- Store JWT in httpOnly cookies for maximum security
- Avoid localStorage due to XSS vulnerabilities
- Use secure, sameSite cookies

**2. Implementation:**
\`\`\`javascript
// Auth context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  const login = async (credentials) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
      credentials: 'include' // Important for cookies
    });
    
    if (response.ok) {
      const userData = await response.json();
      setUser(userData);
    }
  };
  
  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};
\`\`\`

**3. Token Refresh:**
- Implement automatic token refresh using interceptors
- Handle 401 responses gracefully
- Redirect to login when refresh fails

This approach provides both security and good user experience.`,
      author: {
        id: 7,
        name: "Mike Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        reputation: 3450,
        badge: "Gold",
      },
      votes: 23,
      isAccepted: true,
      createdAt: "2024-01-20T11:15:00Z",
    },
    {
      id: 2,
      content: `Another approach is to use a library like \`react-query\` or \`swr\` for handling authentication state:

\`\`\`javascript
import { useQuery } from 'react-query';

const useAuth = () => {
  return useQuery('auth', async () => {
    const response = await fetch('/api/me', {
      credentials: 'include'
    });
    
    if (!response.ok) {
      throw new Error('Not authenticated');
    }
    
    return response.json();
  }, {
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
\`\`\`

This handles caching and refetching automatically.`,
      author: {
        id: 8,
        name: "Sarah Lee",
        avatar: "/placeholder.svg?height=40&width=40",
        reputation: 1890,
        badge: "Silver",
      },
      votes: 12,
      isAccepted: false,
      createdAt: "2024-01-20T12:30:00Z",
    },
  ]

  const Navigation = () => (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage("home")}>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">DevForum</span>
                <div className="text-xs text-blue-600 font-medium">Q&A Community</div>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <button
                onClick={() => setCurrentPage("home")}
                className={`font-medium ${currentPage === "home" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`}
              >
                Questions
              </button>
              <button
                onClick={() => setCurrentPage("tags")}
                className={`font-medium ${currentPage === "tags" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`}
              >
                Tags
              </button>
              <button
                onClick={() => setCurrentPage("users")}
                className={`font-medium ${currentPage === "users" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`}
              >
                Users
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
              <Search className="h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search questions..."
                className="border-0 bg-transparent focus-visible:ring-0 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Button onClick={() => setCurrentPage("ask")} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Ask Question
            </Button>

            {userProfile ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={userProfile.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block text-left">
                      <div className="text-sm font-medium">{userProfile.name}</div>
                      <div className="text-xs text-gray-500">{userProfile.reputation} rep</div>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setCurrentPage("profile")}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline">Login</Button>
                <Button className="bg-blue-600 hover:bg-blue-700">Sign Up</Button>
              </div>
            )}

            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )

  const HomePage = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left p-2 rounded-lg transition-colors ${
                      selectedCategory === category.id ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{category.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-orange-500" />
                  Hot This Week
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {questions.slice(0, 3).map((question) => (
                  <div key={question.id} className="cursor-pointer hover:bg-gray-50 p-2 rounded-lg -m-2">
                    <h4 className="font-medium text-sm line-clamp-2 mb-1">{question.title}</h4>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{question.votes} votes</span>
                      <span>•</span>
                      <span>{question.answers} answers</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">All Questions</h1>
                <p className="text-gray-600">1,234 questions</p>
              </div>
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Sort by: {sortBy}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setSortBy("newest")}>Newest</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("votes")}>Most Votes</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("answers")}>Most Answers</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("views")}>Most Views</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="space-y-4">
              {questions.map((question) => (
                <Card
                  key={question.id}
                  className={`hover:shadow-md transition-shadow cursor-pointer ${
                    question.isFeatured ? "border-l-4 border-l-orange-500" : ""
                  }`}
                  onClick={() => {
                    setSelectedQuestion(question)
                    setCurrentPage("question")
                  }}
                >
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center gap-2 text-sm text-gray-500 min-w-[80px]">
                        <div className="flex items-center gap-1">
                          <ChevronUp className="h-4 w-4" />
                          <span className="font-medium">{question.votes}</span>
                        </div>
                        <div className="text-center">
                          <div className={`font-medium ${question.isAnswered ? "text-green-600" : "text-gray-600"}`}>
                            {question.answers}
                          </div>
                          <div className="text-xs">answers</div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          <span className="text-xs">{question.views}</span>
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-lg text-gray-900 hover:text-blue-600 line-clamp-2">
                            {question.title}
                          </h3>
                          {question.isFeatured && (
                            <Badge className="bg-orange-100 text-orange-800 ml-2">Featured</Badge>
                          )}
                        </div>

                        <p className="text-gray-600 mb-3 line-clamp-2">{question.content}</p>

                        <div className="flex flex-wrap gap-2 mb-3">
                          {question.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={question.author.avatar || "/placeholder.svg"} />
                              <AvatarFallback className="text-xs">{question.author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium text-gray-700">{question.author.name}</span>
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                question.author.badge === "Gold"
                                  ? "border-yellow-500 text-yellow-700"
                                  : question.author.badge === "Silver"
                                    ? "border-gray-400 text-gray-600"
                                    : "border-orange-500 text-orange-700"
                              }`}
                            >
                              {question.author.reputation}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Clock className="h-3 w-3" />
                            <span>{new Date(question.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="bg-blue-600 text-white">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const QuestionDetailPage = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {selectedQuestion && (
            <>
              {/* Question */}
              <Card className="mb-8">
                <CardContent className="p-8">
                  <div className="flex gap-6">
                    <div className="flex flex-col items-center gap-3 min-w-[60px]">
                      <Button variant="ghost" size="icon" className="hover:bg-green-100 hover:text-green-600">
                        <ChevronUp className="h-6 w-6" />
                      </Button>
                      <span className="text-2xl font-bold text-gray-700">{selectedQuestion.votes}</span>
                      <Button variant="ghost" size="icon" className="hover:bg-red-100 hover:text-red-600">
                        <ChevronDown className="h-6 w-6" />
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:bg-blue-100 hover:text-blue-600">
                        <Bookmark className="h-5 w-5" />
                      </Button>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <h1 className="text-2xl font-bold text-gray-900">{selectedQuestion.title}</h1>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Flag className="h-4 w-4 mr-2" />
                            Flag
                          </Button>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {selectedQuestion.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="bg-blue-100 text-blue-700">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="prose max-w-none mb-6">
                        <p className="text-gray-700 leading-relaxed">{selectedQuestion.content}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{selectedQuestion.views} views</span>
                          <span>Asked {new Date(selectedQuestion.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={selectedQuestion.author.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{selectedQuestion.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-sm">{selectedQuestion.author.name}</div>
                            <div className="text-xs text-gray-500">{selectedQuestion.author.reputation} reputation</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Answers */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  {answers.length} Answer{answers.length !== 1 ? "s" : ""}
                </h2>

                <div className="space-y-6">
                  {answers.map((answer) => (
                    <Card key={answer.id} className={answer.isAccepted ? "border-l-4 border-l-green-500" : ""}>
                      <CardContent className="p-6">
                        <div className="flex gap-6">
                          <div className="flex flex-col items-center gap-3 min-w-[60px]">
                            <Button variant="ghost" size="icon" className="hover:bg-green-100 hover:text-green-600">
                              <ChevronUp className="h-6 w-6" />
                            </Button>
                            <span className="text-xl font-bold text-gray-700">{answer.votes}</span>
                            <Button variant="ghost" size="icon" className="hover:bg-red-100 hover:text-red-600">
                              <ChevronDown className="h-6 w-6" />
                            </Button>
                            {answer.isAccepted && <CheckCircle className="h-6 w-6 text-green-600 fill-current" />}
                          </div>

                          <div className="flex-1">
                            <div className="prose max-w-none mb-6">
                              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">{answer.content}</div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm">
                                  <Share2 className="h-4 w-4 mr-2" />
                                  Share
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Flag className="h-4 w-4 mr-2" />
                                  Flag
                                </Button>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="text-sm text-gray-500">
                                  Answered {new Date(answer.createdAt).toLocaleDateString()}
                                </div>
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={answer.author.avatar || "/placeholder.svg"} />
                                  <AvatarFallback>{answer.author.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium text-sm">{answer.author.name}</div>
                                  <div className="text-xs text-gray-500">{answer.author.reputation} reputation</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Answer Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Answer</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <textarea
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={8}
                      placeholder="Write your answer here... You can use Markdown formatting."
                    />
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        <span>Markdown supported. </span>
                        <a href="#" className="text-blue-600 hover:underline">
                          Formatting help
                        </a>
                      </div>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Send className="h-4 w-4 mr-2" />
                        Post Answer
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  )

  const AskQuestionPage = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Ask a Question</h1>
            <p className="text-gray-600">
              Get help from the community by asking a clear, detailed question with relevant tags.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <Input placeholder="What's your programming question? Be specific." className="text-lg" />
                    <p className="text-sm text-gray-500 mt-1">
                      Be specific and imagine you're asking a question to another person.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Body</label>
                    <textarea
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={12}
                      placeholder="Include all the information someone would need to answer your question. You can use Markdown formatting."
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Include details about what you've tried and what you're trying to achieve.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                    <Input placeholder="e.g. javascript react nodejs" />
                    <p className="text-sm text-gray-500 mt-1">
                      Add up to 5 tags to describe what your question is about.
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <Button className="bg-blue-600 hover:bg-blue-700">Post Question</Button>
                    <Button variant="outline">Save Draft</Button>
                    <Button variant="ghost" onClick={() => setCurrentPage("home")}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">Writing Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <h4 className="font-medium text-gray-900">Be specific</h4>
                    <p className="text-gray-600">Include error messages, code snippets, and expected behavior.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Show your work</h4>
                    <p className="text-gray-600">Explain what you've tried and what didn't work.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Use proper formatting</h4>
                    <p className="text-gray-600">Format code blocks and use clear headings.</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Popular Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {["javascript", "react", "python", "nodejs", "css", "html", "database", "api"].map((tag) => (
                      <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-blue-100">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const ProfilePage = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex items-center gap-6 mb-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={userProfile?.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-2xl">{userProfile?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{userProfile?.name}</h1>
                  <p className="text-gray-600 mb-2">Member since {userProfile?.joinDate}</p>
                  <div className="flex items-center gap-4">
                    <Badge
                      className={`${
                        userProfile?.badge === "Gold"
                          ? "bg-yellow-100 text-yellow-800"
                          : userProfile?.badge === "Silver"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-orange-100 text-orange-800"
                      }`}
                    >
                      <Award className="h-3 w-3 mr-1" />
                      {userProfile?.badge} Member
                    </Badge>
                    <span className="text-lg font-bold text-blue-600">{userProfile?.reputation} reputation</span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{userProfile?.questionsAsked}</div>
                  <div className="text-sm text-gray-600">Questions Asked</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{userProfile?.answersGiven}</div>
                  <div className="text-sm text-gray-600">Answers Given</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {Math.round(((userProfile?.answersGiven || 0) / (userProfile?.questionsAsked || 1)) * 100)}%
                  </div>
                  <div className="text-sm text-gray-600">Answer Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="questions" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="questions">My Questions</TabsTrigger>
              <TabsTrigger value="answers">My Answers</TabsTrigger>
              <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
              <TabsTrigger value="reputation">Reputation</TabsTrigger>
            </TabsList>

            <TabsContent value="questions" className="space-y-4">
              {questions.slice(0, 3).map((question) => (
                <Card key={question.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-2">{question.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{question.votes} votes</span>
                          <span>{question.answers} answers</span>
                          <span>{question.views} views</span>
                          <span>{new Date(question.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="answers" className="space-y-4">
              {answers.map((answer) => (
                <Card key={answer.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-gray-700 mb-2 line-clamp-2">{answer.content}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{answer.votes} votes</span>
                          {answer.isAccepted && <Badge className="bg-green-100 text-green-800">Accepted</Badge>}
                          <span>{new Date(answer.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="bookmarks">
              <Card>
                <CardContent className="p-8 text-center">
                  <Bookmark className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No bookmarks yet</h3>
                  <p className="text-gray-600">Bookmark questions to save them for later.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reputation">
              <Card>
                <CardHeader>
                  <CardTitle>Reputation History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b">
                      <span className="text-sm text-gray-600">Answer accepted</span>
                      <span className="text-green-600 font-medium">+15</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b">
                      <span className="text-sm text-gray-600">Question upvoted</span>
                      <span className="text-green-600 font-medium">+5</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b">
                      <span className="text-sm text-gray-600">Answer upvoted</span>
                      <span className="text-green-600 font-medium">+10</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen">
      <Navigation />
      {currentPage === "home" && <HomePage />}
      {currentPage === "question" && <QuestionDetailPage />}
      {currentPage === "ask" && <AskQuestionPage />}
      {currentPage === "profile" && <ProfilePage />}
    </div>
  )
}
