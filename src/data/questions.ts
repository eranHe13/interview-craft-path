import { Question } from "@/types/question";

export const questions: Question[] = [
  {
    id: "two-sum",
    title: "Two Sum",
    slug: "two-sum",
    difficulty: "Easy",
    category: "Arrays",
    tags: ["hash-table", "array"],
    prompt: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]"
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]"
      }
    ],
    starterCode: {
      ts: `function twoSum(nums: number[], target: number): number[] {
  // Your code here
}`,
      py: `def two_sum(nums: list[int], target: int) -> list[int]:
    # Your code here
    pass`
    },
    defaultTests: [
      {
        id: "test-1",
        name: "Example 1",
        input: "[2,7,11,15], 9",
        expected: "[0,1]",
        hidden: false
      },
      {
        id: "test-2",
        name: "Example 2",
        input: "[3,2,4], 6",
        expected: "[1,2]",
        hidden: false
      },
      {
        id: "test-3",
        name: "Duplicates",
        input: "[3,3], 6",
        expected: "[0,1]",
        hidden: false
      },
      {
        id: "test-4",
        name: "Large Array",
        input: "[1,2,3,4,5,6,7,8,9], 17",
        expected: "[7,8]",
        hidden: true
      }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    slug: "valid-parentheses",
    difficulty: "Easy",
    category: "Strings",
    tags: ["string", "stack"],
    prompt: `Given a string \`s\` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'."
    ],
    examples: [
      {
        input: 's = "()"',
        output: "true"
      },
      {
        input: 's = "()[]{}"',
        output: "true"
      },
      {
        input: 's = "(]"',
        output: "false"
      }
    ],
    starterCode: {
      ts: `function isValid(s: string): boolean {
  // Your code here
}`,
      py: `def is_valid(s: str) -> bool:
    # Your code here
    pass`
    },
    defaultTests: [
      {
        id: "test-1",
        name: "Simple Valid",
        input: '"()"',
        expected: "true",
        hidden: false
      },
      {
        id: "test-2",
        name: "Multiple Types",
        input: '"()[]{}"',
        expected: "true",
        hidden: false
      },
      {
        id: "test-3",
        name: "Invalid Mix",
        input: '"(]"',
        expected: "false",
        hidden: false
      },
      {
        id: "test-4",
        name: "Nested Valid",
        input: '"{[()]}"',
        expected: "true",
        hidden: true
      },
      {
        id: "test-5",
        name: "Unbalanced",
        input: '"((("',
        expected: "false",
        hidden: true
      }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: "longest-substring",
    title: "Longest Substring Without Repeating Characters",
    slug: "longest-substring-without-repeating-characters",
    difficulty: "Medium",
    category: "TwoPointers",
    tags: ["hash-table", "string", "sliding-window"],
    prompt: `Given a string \`s\`, find the length of the longest substring without repeating characters.`,
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces."
    ],
    examples: [
      {
        input: 's = "abcabcbb"',
        output: "3",
        explanation: 'The answer is "abc", with the length of 3.'
      },
      {
        input: 's = "bbbbb"',
        output: "1",
        explanation: 'The answer is "b", with the length of 1.'
      },
      {
        input: 's = "pwwkew"',
        output: "3",
        explanation: 'The answer is "wke", with the length of 3.'
      }
    ],
    starterCode: {
      ts: `function lengthOfLongestSubstring(s: string): number {
  // Your code here
}`,
      py: `def length_of_longest_substring(s: str) -> int:
    # Your code here
    pass`
    },
    defaultTests: [
      {
        id: "test-1",
        name: "Repeating Pattern",
        input: '"abcabcbb"',
        expected: "3",
        hidden: false
      },
      {
        id: "test-2",
        name: "All Same",
        input: '"bbbbb"',
        expected: "1",
        hidden: false
      },
      {
        id: "test-3",
        name: "Mixed",
        input: '"pwwkew"',
        expected: "3",
        hidden: false
      },
      {
        id: "test-4",
        name: "Empty",
        input: '""',
        expected: "0",
        hidden: true
      },
      {
        id: "test-5",
        name: "All Unique",
        input: '"abcdefgh"',
        expected: "8",
        hidden: true
      }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: "max-subarray",
    title: "Maximum Subarray",
    slug: "maximum-subarray",
    difficulty: "Medium",
    category: "DP",
    tags: ["array", "divide-and-conquer", "dynamic-programming"],
    prompt: `Given an integer array \`nums\`, find the subarray with the largest sum, and return its sum.`,
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ],
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "The subarray [4,-1,2,1] has the largest sum 6."
      },
      {
        input: "nums = [1]",
        output: "1"
      },
      {
        input: "nums = [5,4,-1,7,8]",
        output: "23"
      }
    ],
    starterCode: {
      ts: `function maxSubArray(nums: number[]): number {
  // Your code here
}`,
      py: `def max_sub_array(nums: list[int]) -> int:
    # Your code here
    pass`
    },
    defaultTests: [
      {
        id: "test-1",
        name: "Mixed Values",
        input: "[-2,1,-3,4,-1,2,1,-5,4]",
        expected: "6",
        hidden: false
      },
      {
        id: "test-2",
        name: "Single Element",
        input: "[1]",
        expected: "1",
        hidden: false
      },
      {
        id: "test-3",
        name: "All Positive",
        input: "[5,4,-1,7,8]",
        expected: "23",
        hidden: false
      },
      {
        id: "test-4",
        name: "All Negative",
        input: "[-2,-1,-3,-4]",
        expected: "-1",
        hidden: true
      }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: "number-of-islands",
    title: "Number of Islands",
    slug: "number-of-islands",
    difficulty: "Medium",
    category: "Graphs",
    tags: ["array", "dfs", "bfs", "matrix"],
    prompt: `Given an m x n 2D binary grid \`grid\` which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.`,
    constraints: [
      "m == grid.length",
      "n == grid[i].length",
      "1 <= m, n <= 300",
      "grid[i][j] is '0' or '1'."
    ],
    examples: [
      {
        input: `grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]`,
        output: "1"
      },
      {
        input: `grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]`,
        output: "3"
      }
    ],
    starterCode: {
      ts: `function numIslands(grid: string[][]): number {
  // Your code here
}`,
      py: `def num_islands(grid: list[list[str]]) -> int:
    # Your code here
    pass`
    },
    defaultTests: [
      {
        id: "test-1",
        name: "Single Island",
        input: '[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]',
        expected: "1",
        hidden: false
      },
      {
        id: "test-2",
        name: "Multiple Islands",
        input: '[["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]',
        expected: "3",
        hidden: false
      },
      {
        id: "test-3",
        name: "No Islands",
        input: '[["0","0","0"],["0","0","0"]]',
        expected: "0",
        hidden: true
      }
    ],
    createdAt: new Date().toISOString()
  }
];

// Add 20 more questions...
const additionalQuestions: Question[] = [
  {
    id: "reverse-linked-list",
    title: "Reverse Linked List",
    slug: "reverse-linked-list",
    difficulty: "Easy",
    category: "Trees",
    tags: ["linked-list", "recursion"],
    prompt: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    constraints: ["The number of nodes in the list is the range [0, 5000].", "-5000 <= Node.val <= 5000"],
    examples: [{input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]"}],
    starterCode: {ts: "function reverseList(head: ListNode | null): ListNode | null {\n  // Your code here\n}"},
    defaultTests: [{id: "test-1", name: "Basic", input: "[1,2,3,4,5]", expected: "[5,4,3,2,1]", hidden: false}],
    createdAt: new Date().toISOString()
  },
  {
    id: "merge-intervals",
    title: "Merge Intervals",
    slug: "merge-intervals",
    difficulty: "Medium",
    category: "Arrays",
    tags: ["array", "sorting"],
    prompt: "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals.",
    constraints: ["1 <= intervals.length <= 10^4"],
    examples: [{input: "[[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]"}],
    starterCode: {ts: "function merge(intervals: number[][]): number[][] {\n  // Your code here\n}"},
    defaultTests: [{id: "test-1", name: "Basic", input: "[[1,3],[2,6],[8,10],[15,18]]", expected: "[[1,6],[8,10],[15,18]]", hidden: false}],
    createdAt: new Date().toISOString()
  },
  {
    id: "climbing-stairs",
    title: "Climbing Stairs",
    slug: "climbing-stairs",
    difficulty: "Easy",
    category: "DP",
    tags: ["dynamic-programming", "memoization"],
    prompt: "You are climbing a staircase. It takes n steps to reach the top. Each time you can climb 1 or 2 steps. How many distinct ways can you climb to the top?",
    constraints: ["1 <= n <= 45"],
    examples: [{input: "n = 2", output: "2", explanation: "1+1, 2"}, {input: "n = 3", output: "3", explanation: "1+1+1, 1+2, 2+1"}],
    starterCode: {ts: "function climbStairs(n: number): number {\n  // Your code here\n}"},
    defaultTests: [{id: "test-1", name: "n=2", input: "2", expected: "2", hidden: false}, {id: "test-2", name: "n=3", input: "3", expected: "3", hidden: false}],
    createdAt: new Date().toISOString()
  },
  {
    id: "coin-change",
    title: "Coin Change",
    slug: "coin-change",
    difficulty: "Medium",
    category: "DP",
    tags: ["dynamic-programming", "array"],
    prompt: "You are given an integer array coins representing coins of different denominations and an integer amount. Return the fewest number of coins needed to make up that amount.",
    constraints: ["1 <= coins.length <= 12", "1 <= coins[i] <= 2^31 - 1", "0 <= amount <= 10^4"],
    examples: [{input: "coins = [1,2,5], amount = 11", output: "3", explanation: "11 = 5 + 5 + 1"}],
    starterCode: {ts: "function coinChange(coins: number[], amount: number): number {\n  // Your code here\n}"},
    defaultTests: [{id: "test-1", name: "Basic", input: "[1,2,5], 11", expected: "3", hidden: false}],
    createdAt: new Date().toISOString()
  },
  {
    id: "3sum",
    title: "3Sum",
    slug: "3sum",
    difficulty: "Medium",
    category: "TwoPointers",
    tags: ["array", "two-pointers", "sorting"],
    prompt: "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.",
    constraints: ["3 <= nums.length <= 3000", "-10^5 <= nums[i] <= 10^5"],
    examples: [{input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]"}],
    starterCode: {ts: "function threeSum(nums: number[]): number[][] {\n  // Your code here\n}"},
    defaultTests: [{id: "test-1", name: "Basic", input: "[-1,0,1,2,-1,-4]", expected: "[[-1,-1,2],[-1,0,1]]", hidden: false}],
    createdAt: new Date().toISOString()
  },
  {
    id: "container-with-most-water",
    title: "Container With Most Water",
    slug: "container-with-most-water",
    difficulty: "Medium",
    category: "TwoPointers",
    tags: ["array", "two-pointers", "greedy"],
    prompt: "Given n non-negative integers representing vertical lines, find two lines that together with the x-axis form a container that contains the most water.",
    constraints: ["n == height.length", "2 <= n <= 10^5", "0 <= height[i] <= 10^4"],
    examples: [{input: "height = [1,8,6,2,5,4,8,3,7]", output: "49"}],
    starterCode: {ts: "function maxArea(height: number[]): number {\n  // Your code here\n}"},
    defaultTests: [{id: "test-1", name: "Basic", input: "[1,8,6,2,5,4,8,3,7]", expected: "49", hidden: false}],
    createdAt: new Date().toISOString()
  },
  {
    id: "product-except-self",
    title: "Product of Array Except Self",
    slug: "product-of-array-except-self",
    difficulty: "Medium",
    category: "Arrays",
    tags: ["array", "prefix-sum"],
    prompt: "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].",
    constraints: ["2 <= nums.length <= 10^5", "-30 <= nums[i] <= 30"],
    examples: [{input: "nums = [1,2,3,4]", output: "[24,12,8,6]"}],
    starterCode: {ts: "function productExceptSelf(nums: number[]): number[] {\n  // Your code here\n}"},
    defaultTests: [{id: "test-1", name: "Basic", input: "[1,2,3,4]", expected: "[24,12,8,6]", hidden: false}],
    createdAt: new Date().toISOString()
  },
  {
    id: "search-rotated-array",
    title: "Search in Rotated Sorted Array",
    slug: "search-in-rotated-sorted-array",
    difficulty: "Medium",
    category: "Arrays",
    tags: ["array", "binary-search"],
    prompt: "Given the array nums after a rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.",
    constraints: ["1 <= nums.length <= 5000", "-10^4 <= nums[i] <= 10^4", "All values of nums are unique"],
    examples: [{input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4"}],
    starterCode: {ts: "function search(nums: number[], target: number): number {\n  // Your code here\n}"},
    defaultTests: [{id: "test-1", name: "Basic", input: "[4,5,6,7,0,1,2], 0", expected: "4", hidden: false}],
    createdAt: new Date().toISOString()
  },
  {
    id: "min-window-substring",
    title: "Minimum Window Substring",
    slug: "minimum-window-substring",
    difficulty: "Hard",
    category: "Strings",
    tags: ["hash-table", "string", "sliding-window"],
    prompt: "Given two strings s and t, return the minimum window substring of s such that every character in t is included in the window.",
    constraints: ["1 <= s.length, t.length <= 10^5"],
    examples: [{input: 's = "ADOBECODEBANC", t = "ABC"', output: '"BANC"'}],
    starterCode: {ts: "function minWindow(s: string, t: string): string {\n  // Your code here\n}"},
    defaultTests: [{id: "test-1", name: "Basic", input: '"ADOBECODEBANC", "ABC"', expected: '"BANC"', hidden: false}],
    createdAt: new Date().toISOString()
  },
  {
    id: "word-break",
    title: "Word Break",
    slug: "word-break",
    difficulty: "Medium",
    category: "DP",
    tags: ["hash-table", "string", "dynamic-programming"],
    prompt: "Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of dictionary words.",
    constraints: ["1 <= s.length <= 300", "1 <= wordDict.length <= 1000"],
    examples: [{input: 's = "leetcode", wordDict = ["leet","code"]', output: "true"}],
    starterCode: {ts: "function wordBreak(s: string, wordDict: string[]): boolean {\n  // Your code here\n}"},
    defaultTests: [{id: "test-1", name: "Basic", input: '"leetcode", ["leet","code"]', expected: "true", hidden: false}],
    createdAt: new Date().toISOString()
  },
  {
    id: "course-schedule",
    title: "Course Schedule",
    slug: "course-schedule",
    difficulty: "Medium",
    category: "Graphs",
    tags: ["dfs", "bfs", "graph", "topological-sort"],
    prompt: "Given numCourses and an array prerequisites where prerequisites[i] = [ai, bi], return true if you can finish all courses.",
    constraints: ["1 <= numCourses <= 2000", "0 <= prerequisites.length <= 5000"],
    examples: [{input: "numCourses = 2, prerequisites = [[1,0]]", output: "true"}],
    starterCode: {ts: "function canFinish(numCourses: number, prerequisites: number[][]): boolean {\n  // Your code here\n}"},
    defaultTests: [{id: "test-1", name: "Basic", input: "2, [[1,0]]", expected: "true", hidden: false}],
    createdAt: new Date().toISOString()
  },
  {
    id: "lru-cache",
    title: "LRU Cache",
    slug: "lru-cache",
    difficulty: "Medium",
    category: "HashMap",
    tags: ["hash-table", "linked-list", "design"],
    prompt: "Design a data structure that follows Least Recently Used (LRU) cache constraints.",
    constraints: ["1 <= capacity <= 3000", "0 <= key <= 10^4"],
    examples: [{input: '["LRUCache", "put", "get"]', output: "[null, null, 1]"}],
    starterCode: {ts: "class LRUCache {\n  constructor(capacity: number) {\n  }\n}"},
    defaultTests: [{id: "test-1", name: "Basic", input: "2", expected: "null", hidden: false}],
    createdAt: new Date().toISOString()
  },
  {
    id: "serialize-tree",
    title: "Serialize and Deserialize Binary Tree",
    slug: "serialize-and-deserialize-binary-tree",
    difficulty: "Hard",
    category: "Trees",
    tags: ["tree", "dfs", "bfs", "design"],
    prompt: "Design an algorithm to serialize and deserialize a binary tree.",
    constraints: ["The number of nodes in the tree is in the range [0, 10^4]"],
    examples: [{input: "root = [1,2,3,null,null,4,5]", output: "[1,2,3,null,null,4,5]"}],
    starterCode: {ts: "function serialize(root: TreeNode | null): string {\n  // Your code here\n}"},
    defaultTests: [{id: "test-1", name: "Basic", input: "[1,2,3,null,null,4,5]", expected: "[1,2,3,null,null,4,5]", hidden: false}],
    createdAt: new Date().toISOString()
  },
  {
    id: "meeting-rooms-ii",
    title: "Meeting Rooms II",
    slug: "meeting-rooms-ii",
    difficulty: "Medium",
    category: "Arrays",
    tags: ["array", "sorting", "heap"],
    prompt: "Given an array of meeting time intervals, return the minimum number of conference rooms required.",
    constraints: ["1 <= intervals.length <= 10^4"],
    examples: [{input: "intervals = [[0,30],[5,10],[15,20]]", output: "2"}],
    starterCode: {ts: "function minMeetingRooms(intervals: number[][]): number {\n  // Your code here\n}"},
    defaultTests: [{id: "test-1", name: "Basic", input: "[[0,30],[5,10],[15,20]]", expected: "2", hidden: false}],
    createdAt: new Date().toISOString()
  },
  {
    id: "alien-dictionary",
    title: "Alien Dictionary",
    slug: "alien-dictionary",
    difficulty: "Hard",
    category: "Graphs",
    tags: ["array", "string", "dfs", "bfs", "topological-sort"],
    prompt: "Given a sorted dictionary of an alien language, derive the order of characters in this language.",
    constraints: ["1 <= words.length <= 100", "1 <= words[i].length <= 100"],
    examples: [{input: 'words = ["wrt","wrf","er","ett","rftt"]', output: '"wertf"'}],
    starterCode: {ts: "function alienOrder(words: string[]): string {\n  // Your code here\n}"},
    defaultTests: [{id: "test-1", name: "Basic", input: '["wrt","wrf","er","ett","rftt"]', expected: '"wertf"', hidden: false}],
    createdAt: new Date().toISOString()
  },
  {
    id: "find-median-stream",
    title: "Find Median from Data Stream",
    slug: "find-median-from-data-stream",
    difficulty: "Hard",
    category: "Math",
    tags: ["heap", "design", "sorting"],
    prompt: "Design a data structure that supports finding the median from a data stream.",
    constraints: ["-10^5 <= num <= 10^5"],
    examples: [{input: '["MedianFinder", "addNum", "findMedian"]', output: "[null, null, 1.0]"}],
    starterCode: {ts: "class MedianFinder {\n  addNum(num: number): void {\n  }\n}"},
    defaultTests: [{id: "test-1", name: "Basic", input: "1", expected: "1.0", hidden: false}],
    createdAt: new Date().toISOString()
  },
  {
    id: "jump-game",
    title: "Jump Game",
    slug: "jump-game",
    difficulty: "Medium",
    category: "Greedy",
    tags: ["array", "dynamic-programming", "greedy"],
    prompt: "Given an array of non-negative integers, determine if you can reach the last index.",
    constraints: ["1 <= nums.length <= 10^4", "0 <= nums[i] <= 10^5"],
    examples: [{input: "nums = [2,3,1,1,4]", output: "true"}],
    starterCode: {ts: "function canJump(nums: number[]): boolean {\n  // Your code here\n}"},
    defaultTests: [{id: "test-1", name: "Can Jump", input: "[2,3,1,1,4]", expected: "true", hidden: false}],
    createdAt: new Date().toISOString()
  },
  {
    id: "partition-equal-subset",
    title: "Partition Equal Subset Sum",
    slug: "partition-equal-subset-sum",
    difficulty: "Medium",
    category: "DP",
    tags: ["array", "dynamic-programming"],
    prompt: "Given an array of positive integers, determine if the array can be partitioned into two subsets with equal sum.",
    constraints: ["1 <= nums.length <= 200", "1 <= nums[i] <= 100"],
    examples: [{input: "nums = [1,5,11,5]", output: "true"}],
    starterCode: {ts: "function canPartition(nums: number[]): boolean {\n  // Your code here\n}"},
    defaultTests: [{id: "test-1", name: "Can Partition", input: "[1,5,11,5]", expected: "true", hidden: false}],
    createdAt: new Date().toISOString()
  },
  {
    id: "word-ladder",
    title: "Word Ladder",
    slug: "word-ladder",
    difficulty: "Hard",
    category: "Graphs",
    tags: ["hash-table", "string", "bfs"],
    prompt: "Given two words beginWord and endWord, and a dictionary wordList, return the length of shortest transformation sequence.",
    constraints: ["1 <= beginWord.length <= 10", "beginWord.length == endWord.length"],
    examples: [{input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]', output: "5"}],
    starterCode: {ts: "function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {\n  // Your code here\n}"},
    defaultTests: [{id: "test-1", name: "Basic", input: '"hit", "cog", ["hot","dot","dog","lot","log","cog"]', expected: "5", hidden: false}],
    createdAt: new Date().toISOString()
  },
  {
    id: "n-queens",
    title: "N-Queens",
    slug: "n-queens",
    difficulty: "Hard",
    category: "Backtracking",
    tags: ["array", "backtracking"],
    prompt: "The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.",
    constraints: ["1 <= n <= 9"],
    examples: [{input: "n = 4", output: '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]'}],
    starterCode: {ts: "function solveNQueens(n: number): string[][] {\n  // Your code here\n}"},
    defaultTests: [{id: "test-1", name: "n=4", input: "4", expected: "2", hidden: false}],
    createdAt: new Date().toISOString()
  }
];

export const allQuestions = [...questions, ...additionalQuestions];
