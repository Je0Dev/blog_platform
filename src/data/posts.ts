export interface RelatedPost {
  id: string;
  title: string;
  slug: string;
}

export interface ExternalLink {
  title: string;
  url: string;
  description: string;
}

export interface ProjectLink {
  name: string;
  url: string;
  description: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  image: string;
  color: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  relatedPosts: RelatedPost[];
  externalLinks: ExternalLink[];
  projectLinks: ProjectLink[];
  tableOfContents: { id: string; title: string; level: number }[];
}

export const posts: Post[] = [
  {
    id: '1',
    title: 'Mastering TypeScript Generics: A Deep Dive',
    slug: 'mastering-typescript-generics',
    excerpt: 'Unlock the full power of TypeScript with advanced generic patterns, conditional types, and type inference strategies.',
    content: `
TypeScript generics are one of the most powerful features of the language, enabling you to write flexible, reusable code while maintaining type safety. In this comprehensive guide, we'll explore everything from basic generics to advanced patterns used in real-world applications.

## What Are Generics?

Generics allow you to create reusable components that can work with multiple types rather than a single one. Think of them as variables for types.

## Basic Generic Syntax

The simplest form of a generic is a function that can accept any type:

\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}

// Usage
const num = identity<number>(42);
const str = identity<string>("hello");
\`\`\`

## Generic Constraints

Sometimes you want to constrain the types that can be used with your generic:

\`\`\`typescript
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(arg: T): T {
  console.log(arg.length);
  return arg;
}
\`\`\`

## Conditional Types

Conditional types allow you to create types that depend on a condition:

\`\`\`typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<string>;  // true
type B = IsString<number>;  // false
\`\`\`

## Real-World Applications

Generics are used extensively in popular libraries like React, Lodash, and RxJS. Understanding them deeply will make you a more effective TypeScript developer.
    `,
    date: 'Dec 15, 2024',
    readTime: '8 min',
    tags: ['TypeScript', 'JavaScript', 'Web Development'],
    image: '/blog1.jpg',
    color: '#3178c6',
    author: {
      name: 'Alex Chen',
      avatar: '/hero.jpg',
      bio: 'Full-stack developer passionate about type systems and clean code.'
    },
    relatedPosts: [
      { id: '2', title: 'Building Real-time Apps with WebSockets', slug: 'building-realtime-apps-websockets' },
      { id: '3', title: 'React Server Components Explained', slug: 'react-server-components-explained' },
    ],
    externalLinks: [
      { 
        title: 'TypeScript Handbook - Generics', 
        url: 'https://www.typescriptlang.org/docs/handbook/2/generics.html',
        description: 'Official TypeScript documentation on generics'
      },
      { 
        title: 'Advanced TypeScript Patterns', 
        url: 'https://github.com/total-typescript/advanced-typescript-patterns',
        description: 'GitHub repo with advanced TypeScript patterns'
      },
    ],
    projectLinks: [
      {
        name: 'ts-pattern-matcher',
        url: 'https://github.com/alex/ts-pattern-matcher',
        description: 'A pattern matching library for TypeScript using generics'
      },
    ],
    tableOfContents: [
      { id: 'what-are-generics', title: 'What Are Generics?', level: 2 },
      { id: 'basic-syntax', title: 'Basic Generic Syntax', level: 2 },
      { id: 'constraints', title: 'Generic Constraints', level: 2 },
      { id: 'conditional-types', title: 'Conditional Types', level: 2 },
      { id: 'applications', title: 'Real-World Applications', level: 2 },
    ],
  },
  {
    id: '2',
    title: 'Building Real-time Apps with WebSockets',
    slug: 'building-realtime-apps-websockets',
    excerpt: 'Learn how to implement bidirectional communication in your applications using WebSockets and Node.js.',
    content: `
Real-time applications have become essential in modern web development. From chat applications to live dashboards, WebSockets provide the foundation for instant bidirectional communication.

## Understanding WebSockets

WebSockets represent a significant advancement in web communication. Unlike HTTP's request-response model, WebSockets maintain a persistent connection that allows data to flow in both directions.

## Setting Up a WebSocket Server

Let's start with a simple Node.js server using the popular \`ws\` library:

\`\`\`javascript
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('New client connected');
  
  ws.on('message', (data) => {
    console.log('Received:', data.toString());
    // Broadcast to all clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
  
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
\`\`\`

## Client-Side Implementation

On the client side, the WebSocket API is built into modern browsers:

\`\`\`javascript
const ws = new WebSocket('ws://localhost:8080');

ws.onopen = () => {
  console.log('Connected to server');
  ws.send('Hello from client!');
};

ws.onmessage = (event) => {
  console.log('Received:', event.data);
};

ws.onerror = (error) => {
  console.error('WebSocket error:', error);
};
\`\`\`

## Scaling WebSocket Applications

For production applications, you'll need to consider:

- **Horizontal scaling**: Using Redis or similar for multi-server setups
- **Connection management**: Heartbeats and reconnection strategies
- **Security**: WSS (WebSocket Secure) and authentication
- **Monitoring**: Connection metrics and error tracking

## Use Cases

WebSockets excel in scenarios requiring real-time updates:

- Chat applications
- Live collaboration tools
- Real-time gaming
- Financial tickers
- IoT device monitoring
    `,
    date: 'Dec 12, 2024',
    readTime: '12 min',
    tags: ['Node.js', 'JavaScript', 'WebSockets', 'Real-time'],
    image: '/blog2.jpg',
    color: '#339933',
    author: {
      name: 'Alex Chen',
      avatar: '/hero.jpg',
      bio: 'Full-stack developer passionate about real-time systems.'
    },
    relatedPosts: [
      { id: '1', title: 'Mastering TypeScript Generics', slug: 'mastering-typescript-generics' },
      { id: '4', title: 'Rust for JavaScript Developers', slug: 'rust-for-javascript-developers' },
    ],
    externalLinks: [
      { 
        title: 'WebSocket API MDN', 
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/WebSocket',
        description: 'MDN documentation for the WebSocket API'
      },
      { 
        title: 'Socket.io Documentation', 
        url: 'https://socket.io/docs/',
        description: 'Popular WebSocket library with fallbacks'
      },
    ],
    projectLinks: [
      {
        name: 'chat-app-realtime',
        url: 'https://github.com/alex/chat-app-realtime',
        description: 'A real-time chat application built with WebSockets'
      },
    ],
    tableOfContents: [
      { id: 'understanding', title: 'Understanding WebSockets', level: 2 },
      { id: 'server-setup', title: 'Setting Up a WebSocket Server', level: 2 },
      { id: 'client-implementation', title: 'Client-Side Implementation', level: 2 },
      { id: 'scaling', title: 'Scaling WebSocket Applications', level: 2 },
      { id: 'use-cases', title: 'Use Cases', level: 2 },
    ],
  },
  {
    id: '3',
    title: 'React Server Components Explained',
    slug: 'react-server-components-explained',
    excerpt: 'Understanding the future of React with Server Components and how they change the way we build applications.',
    content: `
React Server Components (RSC) represent a paradigm shift in how we build React applications. They blur the line between server and client, offering new possibilities for performance and developer experience.

## What Are Server Components?

Server Components are React components that render exclusively on the server. They never ship JavaScript to the client, resulting in zero client-side bundle size impact.

## Key Benefits

### 1. Zero Bundle Size
Server Components don't add to your JavaScript bundle. This means:
- Faster initial page loads
- Reduced memory usage on the client
- Better performance on low-end devices

### 2. Direct Backend Access
Server Components can directly access server-side resources:
- Databases
- File systems
- Internal APIs

\`\`\`jsx
// This runs on the server only!
async function BlogPosts() {
  const posts = await db.posts.findAll(); // Direct database access
  
  return (
    <div>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
\`\`\`

### 3. Automatic Code Splitting
Client Components imported by Server Components are automatically code-split.

## Server vs Client Components

| Feature | Server Component | Client Component |
|---------|------------------|------------------|
| Render Location | Server only | Client (browser) |
| JS Bundle | 0 bytes | Included |
| useState/useEffect | ❌ | ✅ |
| Browser APIs | ❌ | ✅ |
| Backend Access | ✅ | ❌ |

## When to Use Each

**Use Server Components for:**
- Static content
- Data fetching
- Accessing backend resources
- Large dependencies that shouldn't be client-side

**Use Client Components for:**
- Interactive UI
- Browser APIs
- React hooks
- Event handlers

## The Future of React

Server Components are the foundation of frameworks like Next.js App Router and are shaping the future of React development.
    `,
    date: 'Dec 8, 2024',
    readTime: '10 min',
    tags: ['React', 'JavaScript', 'Server Components', 'Next.js'],
    image: '/blog3.jpg',
    color: '#61dafb',
    author: {
      name: 'Alex Chen',
      avatar: '/hero.jpg',
      bio: 'React enthusiast exploring the future of frontend development.'
    },
    relatedPosts: [
      { id: '1', title: 'Mastering TypeScript Generics', slug: 'mastering-typescript-generics' },
      { id: '5', title: 'Python for Data Analysis', slug: 'python-for-data-analysis' },
    ],
    externalLinks: [
      { 
        title: 'React Server Components RFC', 
        url: 'https://github.com/reactjs/rfcs/blob/main/text/0188-server-components.md',
        description: 'Official React RFC for Server Components'
      },
      { 
        title: 'Next.js App Router', 
        url: 'https://nextjs.org/docs/app',
        description: 'Next.js documentation for App Router with RSC'
      },
    ],
    projectLinks: [
      {
        name: 'nextjs-rsc-demo',
        url: 'https://github.com/alex/nextjs-rsc-demo',
        description: 'Demo application showcasing React Server Components'
      },
    ],
    tableOfContents: [
      { id: 'what-are-rsc', title: 'What Are Server Components?', level: 2 },
      { id: 'benefits', title: 'Key Benefits', level: 2 },
      { id: 'server-vs-client', title: 'Server vs Client Components', level: 2 },
      { id: 'when-to-use', title: 'When to Use Each', level: 2 },
      { id: 'future', title: 'The Future of React', level: 2 },
    ],
  },
  {
    id: '4',
    title: 'Rust for JavaScript Developers',
    slug: 'rust-for-javascript-developers',
    excerpt: 'A comprehensive guide to Rust concepts for developers coming from JavaScript backgrounds.',
    content: `
Rust is gaining massive popularity in the web development ecosystem. From build tools to WebAssembly, learning Rust can significantly expand your capabilities as a developer.

## Why Rust?

Rust offers several advantages that appeal to JavaScript developers:

- **Performance**: Near C/C++ speed without the memory safety issues
- **Type Safety**: Compile-time guarantees that eliminate entire classes of bugs
- **WebAssembly**: Write performance-critical code that runs in the browser
- **Tooling**: Excellent package manager (Cargo) and build system

## Variables and Mutability

In JavaScript, variables are mutable by default:

\`\`\`javascript
let x = 5;
x = 10; // No problem
\`\`\`

In Rust, variables are immutable by default:

\`\`\`rust
let x = 5;
x = 10; // Error! Cannot assign twice to immutable variable

let mut y = 5;
y = 10; // OK - y is mutable
\`\`\`

## Ownership: Rust's Killer Feature

Ownership is Rust's most unique feature. It enables memory safety without a garbage collector:

\`\`\`rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1; // s1's value is moved to s2
    
    // println!("{}", s1); // Error! s1 no longer valid
    println!("{}", s2); // OK
}
\`\`\`

## Pattern Matching

Rust's pattern matching is incredibly powerful:

\`\`\`rust
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
}

fn handle_message(msg: Message) {
    match msg {
        Message::Quit => println!("Quitting"),
        Message::Move { x, y } => println!("Moving to ({}, {})", x, y),
        Message::Write(text) => println!("Text: {}", text),
    }
}
\`\`\`

## Building for the Web

Rust shines in web development through WebAssembly:

\`\`\`rust
#[wasm_bindgen]
pub fn fibonacci(n: u32) -> u32 {
    match n {
        0 => 0,
        1 => 1,
        _ => fibonacci(n - 1) + fibonacci(n - 2),
    }
}
\`\`\`

This compiles to WebAssembly and can be called from JavaScript with near-native performance.
    `,
    date: 'Dec 5, 2024',
    readTime: '15 min',
    tags: ['Rust', 'WebAssembly', 'Systems Programming'],
    image: '/blog4.jpg',
    color: '#dea584',
    author: {
      name: 'Alex Chen',
      avatar: '/hero.jpg',
      bio: 'Exploring systems programming and WebAssembly.'
    },
    relatedPosts: [
      { id: '2', title: 'Building Real-time Apps with WebSockets', slug: 'building-realtime-apps-websockets' },
      { id: '6', title: 'Go Concurrency Patterns', slug: 'go-concurrency-patterns' },
    ],
    externalLinks: [
      { 
        title: 'The Rust Book', 
        url: 'https://doc.rust-lang.org/book/',
        description: 'Official Rust programming language book'
      },
      { 
        title: 'Rust by Example', 
        url: 'https://doc.rust-lang.org/rust-by-example/',
        description: 'Learn Rust through practical examples'
      },
    ],
    projectLinks: [
      {
        name: 'wasm-image-processor',
        url: 'https://github.com/alex/wasm-image-processor',
        description: 'High-performance image processing in Rust/WebAssembly'
      },
    ],
    tableOfContents: [
      { id: 'why-rust', title: 'Why Rust?', level: 2 },
      { id: 'variables', title: 'Variables and Mutability', level: 2 },
      { id: 'ownership', title: 'Ownership', level: 2 },
      { id: 'pattern-matching', title: 'Pattern Matching', level: 2 },
      { id: 'web', title: 'Building for the Web', level: 2 },
    ],
  },
  {
    id: '5',
    title: 'Python for Data Analysis: Pandas Tips',
    slug: 'python-for-data-analysis',
    excerpt: 'Essential Pandas techniques to supercharge your data analysis workflow.',
    content: `
Pandas is the go-to library for data manipulation in Python. These tips will help you write more efficient and readable data analysis code.

## Method Chaining

Instead of creating intermediate variables, chain methods together:

\`\`\`python
# Instead of this
df_filtered = df[df['age'] > 18]
df_grouped = df_filtered.groupby('category')
df_result = df_grouped['amount'].sum()

# Do this
result = (df
    .query('age > 18')
    .groupby('category')['amount']
    .sum()
)
\`\`\`

## Vectorized Operations

Avoid loops - use vectorized operations for better performance:

\`\`\`python
# Slow - iterating rows
for idx, row in df.iterrows():
    df.loc[idx, 'new_col'] = row['a'] + row['b']

# Fast - vectorized
df['new_col'] = df['a'] + df['b']
\`\`\`

## Memory Optimization

Large datasets can quickly consume memory. Use appropriate data types:

\`\`\`python
# Check memory usage
df.info(memory_usage='deep')

# Optimize data types
df['category'] = df['category'].astype('category')
df['int_col'] = df['int_col'].astype('int32')  # Instead of int64
\`\`\`

## Query Method

The \`query\` method is often more readable than boolean indexing:

\`\`\`python
# Boolean indexing
df[(df['age'] > 18) & (df['city'] == 'NYC')]

# Query method
df.query('age > 18 and city == "NYC"')
\`\`\`

## Working with Time Series

Pandas excels at time series analysis:

\`\`\`python
# Parse dates
df['date'] = pd.to_datetime(df['date'])

# Set as index
df.set_index('date', inplace=True)

# Resample to monthly
monthly = df.resample('M').sum()
\`\`\`
    `,
    date: 'Dec 1, 2024',
    readTime: '6 min',
    tags: ['Python', 'Pandas', 'Data Science'],
    image: '/blog5.jpg',
    color: '#3776ab',
    author: {
      name: 'Alex Chen',
      avatar: '/hero.jpg',
      bio: 'Data enthusiast and Python developer.'
    },
    relatedPosts: [
      { id: '3', title: 'React Server Components Explained', slug: 'react-server-components-explained' },
      { id: '6', title: 'Go Concurrency Patterns', slug: 'go-concurrency-patterns' },
    ],
    externalLinks: [
      { 
        title: 'Pandas Documentation', 
        url: 'https://pandas.pydata.org/docs/',
        description: 'Official Pandas documentation'
      },
      { 
        title: 'Python Data Science Handbook', 
        url: 'https://jakevdp.github.io/PythonDataScienceHandbook/',
        description: 'Free online book on data science with Python'
      },
    ],
    projectLinks: [
      {
        name: 'data-analysis-toolkit',
        url: 'https://github.com/alex/data-analysis-toolkit',
        description: 'Collection of Pandas utilities for data analysis'
      },
    ],
    tableOfContents: [
      { id: 'method-chaining', title: 'Method Chaining', level: 2 },
      { id: 'vectorized', title: 'Vectorized Operations', level: 2 },
      { id: 'memory', title: 'Memory Optimization', level: 2 },
      { id: 'query', title: 'Query Method', level: 2 },
      { id: 'time-series', title: 'Working with Time Series', level: 2 },
    ],
  },
  {
    id: '6',
    title: 'Go Concurrency Patterns You Should Know',
    slug: 'go-concurrency-patterns',
    excerpt: 'Master goroutines, channels, and common concurrency patterns in Go.',
    content: `
Go's concurrency model based on goroutines and channels is one of its standout features. Let's explore the patterns that make Go concurrency both powerful and approachable.

## Goroutines: Lightweight Threads

Goroutines are functions that run concurrently with other functions:

\`\`\`go
func main() {
    go sayHello()
    go sayWorld()
    
    time.Sleep(time.Second) // Wait for goroutines
}

func sayHello() {
    fmt.Println("Hello")
}

func sayWorld() {
    fmt.Println("World")
}
\`\`\`

## Channels: Communication Between Goroutines

Channels are typed conduits for communication:

\`\`\`go
func main() {
    messages := make(chan string)
    
    go func() {
        messages <- "Hello from goroutine!"
    }()
    
    msg := <-messages
    fmt.Println(msg)
}
\`\`\`

## The Worker Pool Pattern

A common pattern for managing concurrent work:

\`\`\`go
func worker(id int, jobs <-chan int, results chan<- int) {
    for j := range jobs {
        fmt.Printf("Worker %d processing job %d\\n", id, j)
        time.Sleep(time.Second)
        results <- j * 2
    }
}

func main() {
    jobs := make(chan int, 100)
    results := make(chan int, 100)
    
    // Start 3 workers
    for w := 1; w <= 3; w++ {
        go worker(w, jobs, results)
    }
    
    // Send 9 jobs
    for j := 1; j <= 9; j++ {
        jobs <- j
    }
    close(jobs)
    
    // Collect results
    for a := 1; a <= 9; a++ {
        <-results
    }
}
\`\`\`

## Select Statement

The select statement lets you wait on multiple channel operations:

\`\`\`go
select {
case msg1 := <-ch1:
    fmt.Println("Received from ch1:", msg1)
case msg2 := <-ch2:
    fmt.Println("Received from ch2:", msg2)
case <-time.After(time.Second):
    fmt.Println("Timeout!")
}
\`\`\`

## Best Practices

1. **Don't communicate by sharing memory; share memory by communicating**
2. **Close channels from the sender, not the receiver**
3. **Use buffered channels when you know the capacity**
4. **Always handle potential deadlocks**
    `,
    date: 'Nov 28, 2024',
    readTime: '11 min',
    tags: ['Go', 'Concurrency', 'Backend'],
    image: '/blog6.jpg',
    color: '#00add8',
    author: {
      name: 'Alex Chen',
      avatar: '/hero.jpg',
      bio: 'Backend developer exploring Go and distributed systems.'
    },
    relatedPosts: [
      { id: '4', title: 'Rust for JavaScript Developers', slug: 'rust-for-javascript-developers' },
      { id: '2', title: 'Building Real-time Apps with WebSockets', slug: 'building-realtime-apps-websockets' },
    ],
    externalLinks: [
      { 
        title: 'Go Concurrency Patterns', 
        url: 'https://go.dev/blog/pipelines',
        description: 'Official Go blog on concurrency patterns'
      },
      { 
        title: 'Go by Example: Goroutines', 
        url: 'https://gobyexample.com/goroutines',
        description: 'Practical Go concurrency examples'
      },
    ],
    projectLinks: [
      {
        name: 'go-worker-pool',
        url: 'https://github.com/alex/go-worker-pool',
        description: 'Flexible worker pool implementation in Go'
      },
    ],
    tableOfContents: [
      { id: 'goroutines', title: 'Goroutines', level: 2 },
      { id: 'channels', title: 'Channels', level: 2 },
      { id: 'worker-pool', title: 'Worker Pool Pattern', level: 2 },
      { id: 'select', title: 'Select Statement', level: 2 },
      { id: 'best-practices', title: 'Best Practices', level: 2 },
    ],
  },
];

export const getPostBySlug = (slug: string): Post | undefined => {
  return posts.find(post => post.slug === slug);
};

export const getPostsByTag = (tag: string): Post[] => {
  return posts.filter(post => 
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
};

export const getAllTags = (): string[] => {
  const tags = new Set<string>();
  posts.forEach(post => {
    post.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
};

export const getRelatedPosts = (currentSlug: string): Post[] => {
  const currentPost = getPostBySlug(currentSlug);
  if (!currentPost) return [];
  
  return posts.filter(post => 
    post.slug !== currentSlug &&
    post.tags.some(tag => currentPost.tags.includes(tag))
  ).slice(0, 3);
};
