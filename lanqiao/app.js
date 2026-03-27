const algoData = {
    // ================= 入门篇 =================
    'utils': {
        title: '工具函数模版 (C++ STL)',
        principle: `<p>蓝桥杯中熟练使用 <code>&lt;algorithm&gt;</code> 库能大幅节省时间。</p>
        <ul>
            <li><strong>排序：</strong> <code>sort(a.begin(), a.end(), cmp)</code> 默认升序O(NlogN)。</li>
            <li><strong>全排列：</strong> <code>next_permutation(a.begin(), a.end())</code> 暴力枚举必备，使用前需保证数组有序。</li>
            <li><strong>去重：</strong> <code>unique(a.begin(), a.end())</code> 返回去重后末尾迭代器（配合sort使用）。</li>
            <li><strong>填充：</strong> <code>memset(arr, 0, sizeof(arr))</code> 只能填0或-1；<code>fill(a.begin(), a.end(), val)</code> 可填任意值。</li>
        </ul>`,
        complexity: { time: 'O(N log N) 排序', space: 'O(1) 原地操作' },
        stl:['<algorithm>', 'std::sort', 'std::next_permutation'],
        code: `<span class="comment">// 蓝桥杯全排列枚举模版</span>
<span class="type">void</span> <span class="function">solve</span>() {
    vector&lt;<span class="type">int</span>&gt; a = {1, 2, 3};
    <span class="keyword">do</span> {
        <span class="keyword">for</span>(<span class="type">int</span> x : a) cout &lt;&lt; x &lt;&lt; " ";
        cout &lt;&lt; endl;
    } <span class="keyword">while</span> (next_permutation(a.begin(), a.end()));
}`,
        problems:[
            { title: '全排列问题', difficulty: 'easy', desc: '输出自然数1到n所有不重复的排列', tags:['STL', '暴力'] },
            { title: '明明的随机数', difficulty: 'easy', desc: '数组去重与排序', tags: ['sort', 'unique'] }
        ]
    },
    'prefix-diff': {
        title: '差分与前缀和',
        principle: `<p>这是处理“区间查询”和“区间修改”的最优基础算法。</p>
        <h4>1. 前缀和</h4>
        <p>用于 <strong style="color:#d81b60">O(1) 快速求区间和</strong>。公式：<code>sum[i] = sum[i-1] + a[i]</code>。区间 [L, R] 的和 = <code>sum[R] - sum[L-1]</code>。</p>
        <h4>2. 差分数组</h4>
        <p>用于 <strong style="color:#d81b60">O(1) 快速区间修改</strong>（给区间 [L, R] 都加上 x）。构建 <code>diff[i] = a[i] - a[i-1]</code>。修改操作：<code>diff[L] += x, diff[R+1] -= x</code>。最后求一次差分数组的前缀和即可还原原数组。</p>`,
        complexity: { time: '预处理 O(N)，查询 O(1)', space: 'O(N)' },
        stl:['vector<int>', 'std::partial_sum (可选)'],
        code: `<span class="comment">// 差分区间修改模版</span>
<span class="type">void</span> <span class="function">add</span>(<span class="type">int</span> l, <span class="type">int</span> r, <span class="type">int</span> c) {
    diff[l] += c;
    diff[r + 1] -= c;
}
<span class="comment">// 还原并求前缀和</span>
<span class="keyword">for</span>(<span class="type">int</span> i = <span class="number">1</span>; i &lt;= n; i++) {
    a[i] = a[i-1] + diff[i];
    sum[i] = sum[i-1] + a[i];
}`,
        problems:[
            { title: '区间和', difficulty: 'easy', desc: '多次查询区间元素之和', tags: ['前缀和'] },
            { title: '激光炸弹', difficulty: 'medium', desc: '二维前缀和经典题', tags: ['二维前缀和'] },
            { title: '借教室', difficulty: 'medium', desc: '二分+差分数组', tags: ['差分', '二分'] }
        ]
    },
    'enum-twopointers': {
        title: '枚举与双指针 (尺取法)',
        principle: `<p>双指针（尺取法）通过维护一个滑动窗口 <code>[left, right]</code> 来解决子数组/子串问题，将两层循环的 O(N²) 暴力枚举优化为 O(N)。</p>
        <p><strong>核心思想：</strong> 当右指针扩大窗口时，如果满足/打破了某种条件，左指针就要收缩窗口。两个指针都只向右走，不回退。</p>`,
        complexity: { time: 'O(N)', space: 'O(1)' },
        stl:['<iostream>', 'std::max', 'std::min'],
        code: `<span class="comment">// 找和大于等于 target 的最短子数组</span>
<span class="type">int</span> <span class="function">minSubArrayLen</span>(<span class="type">int</span> target, vector&lt;<span class="type">int</span>&gt;& nums) {
    <span class="type">int</span> left = 0, sum = 0, ans = INT_MAX;
    <span class="keyword">for</span> (<span class="type">int</span> right = 0; right &lt; nums.size(); right++) {
        sum += nums[right];
        <span class="keyword">while</span> (sum &gt;= target) { <span class="comment">// 满足条件，尝试收缩</span>
            ans = min(ans, right - left + 1);
            sum -= nums[left++];
        }
    }
    <span class="keyword">return</span> ans == INT_MAX ? 0 : ans;
}`,
        problems:[
            { title: '寻找目标和', difficulty: 'easy', desc: '有序数组找两数之和', tags: ['双指针'] },
            { title: '回文子串', difficulty: 'medium', desc: '中心扩散法', tags:['枚举', '双指针'] },
            { title: '日志统计 (蓝桥真题)', difficulty: 'medium', desc: '尺取法统计区间点赞数', tags: ['尺取法'] }
        ]
    },

    // ================= 进阶篇 =================
    'binary-search': {
        title: '二分算法与二分答案',
        principle: `<p>在<strong>单调有序</strong>的序列中查找，每次折半。蓝桥杯中最常考的是<strong>二分答案</strong>（将求解最优值问题转化为判定问题）。</p>
        <ul>
            <li><code>lower_bound(a, a+n, x)</code>：返回首个 <strong>&ge; x</strong> 的指针。</li>
            <li><code>upper_bound(a, a+n, x)</code>：返回首个 <strong>&gt; x</strong> 的指针。</li>
        </ul>
        <p><strong>二分答案模板套路：</strong> <code>while(l <= r) { int mid = l + (r-l)/2; if(check(mid)) ans = mid, l = mid+1; else r = mid-1; }</code></p>`,
        complexity: { time: 'O(log N)', space: 'O(1)' },
        stl: ['std::lower_bound', 'std::upper_bound'],
        code: `<span class="comment">// 浮点数二分求平方根</span>
<span class="type">double</span> <span class="function">sqrt_bs</span>(<span class="type">double</span> x) {
    <span class="type">double</span> l = 0, r = max(x, 1.0);
    <span class="keyword">while</span> (r - l &gt; 1e-6) { <span class="comment">// 精度控制</span>
        <span class="type">double</span> mid = (l + r) / 2;
        <span class="keyword">if</span> (mid * mid &lt;= x) l = mid;
        <span class="keyword">else</span> r = mid;
    }
    <span class="keyword">return</span> l;
}`,
        problems:[
            { title: '分巧克力 (蓝桥真题)', difficulty: 'medium', desc: '最大化正方形边长', tags: ['二分答案'] },
            { title: '跳石头', difficulty: 'hard', desc: '使最短跳跃距离最大', tags: ['二分答案', '贪心'] }
        ]
    },
    'search': {
        title: '搜索算法 (DFS/BFS)',
        principle: `<p>搜索是蓝桥杯拿分的“命根子”（骗分神器）。</p>
        <h4>深度优先搜索 (DFS)</h4>
        <p>不到黄河心不死。常用于：<strong>组合枚举、迷宫找路径、连通块求面积</strong>。依靠递归栈实现，注意回溯还原现场。</p>
        <h4>广度优先搜索 (BFS)</h4>
        <p>像水波纹一样扩散。常用于：<strong>无权图的最短步数、层序遍历</strong>。借助 <code>std::queue</code> 实现，第一次访问到目标就是最短路。</p>`,
        complexity: { time: 'O(V + E)', space: 'O(V) 栈/队列开销' },
        stl:['std::queue', 'std::vector', 'std::pair'],
        code: `<span class="comment">// BFS 求最短路模版</span>
<span class="type">int</span> <span class="function">bfs</span>(pair&lt;<span class="type">int</span>,<span class="type">int</span>&gt; start) {
    queue&lt;pair&lt;<span class="type">int</span>,<span class="type">int</span>&gt;&gt; q;
    q.push(start); visited[start.x][start.y] = <span class="keyword">true</span>;
    <span class="keyword">while</span> (!q.empty()) {
        <span class="keyword">auto</span> curr = q.front(); q.pop();
        <span class="keyword">for</span>(<span class="type">int</span> i=0; i&lt;4; i++) { <span class="comment">// 遍历四个方向</span>
            <span class="type">int</span> nx = curr.x + dx[i], ny = curr.y + dy[i];
            <span class="keyword">if</span>(check(nx, ny) && !visited[nx][ny]) {
                visited[nx][ny] = <span class="keyword">true</span>;
                q.push({nx, ny});
            }
        }
    }
}`,
        problems:[
            { title: '全球变暖 (蓝桥真题)', difficulty: 'medium', desc: '求被淹没的岛屿数量', tags: ['BFS/DFS', '连通块'] },
            { title: '地宫取宝 (蓝桥真题)', difficulty: 'hard', desc: '结合记忆化的DFS', tags: ['DFS', '记忆化搜索'] }
        ]
    },
    'greedy': {
        title: '贪心算法',
        principle: `<p>贪心就是在每一步选择中都采取当前状态下的最优解，期望从而导致全局最优。贪心没有固定模板，核心在于<strong>排序策略</strong>。</p>
        <p><strong>经典模型：</strong></p>
        <ul>
            <li><strong>区间调度问题：</strong> 尽量选结束早的（按结束时间升序排序）。</li>
            <li><strong>哈夫曼树：</strong> 每次合并最小的两个（使用优先队列 priority_queue）。</li>
        </ul>`,
        complexity: { time: 'O(N log N) 主要在排序', space: 'O(1)' },
        stl: ['std::sort', 'std::priority_queue'],
        code: `<span class="comment">// 区间调度：选择最多不重叠的区间</span>
<span class="keyword">struct</span> Interval { <span class="type">int</span> start, end; };
<span class="type">bool</span> <span class="function">cmp</span>(Interval a, Interval b) { <span class="keyword">return</span> a.end &lt; b.end; }

<span class="type">int</span> <span class="function">maxIntervals</span>(vector&lt;Interval&gt;& itvs) {
    sort(itvs.begin(), itvs.end(), cmp);
    <span class="type">int</span> count = 0, last_end = -1;
    <span class="keyword">for</span>(<span class="keyword">auto</span> i : itvs) {
        <span class="keyword">if</span>(i.start &gt;= last_end) {
            count++;
            last_end = i.end;
        }
    }
    <span class="keyword">return</span> count;
}`,
        problems:[
            { title: '活动安排', difficulty: 'easy', desc: '最多能安排几个不冲突的活动', tags:['贪心', '区间问题'] },
            { title: '乘船问题', difficulty: 'medium', desc: '双指针+贪心匹配重量', tags: ['贪心'] }
        ]
    },
    'union-find': {
        title: '并查集',
        principle: `<p>高效解决<strong>“合并集合”</strong>和<strong>“判断连通性”</strong>的数据结构。森林结构，每个集合用树表示，根节点是集合代表。</p>
        <p><strong>两大核心优化：</strong></p>
        <ul>
            <li><strong>路径压缩：</strong> 在Find时，直接将沿途节点的父节点指向根，使树高变为O(1)。</li>
            <li><strong>按秩合并：</strong> 将矮树接到高树下（通常有路径压缩就够了）。</li>
        </ul>`,
        complexity: { time: 'O(α(N)) 近乎 O(1)', space: 'O(N)' },
        stl: ['vector<int>', 'iota(初始化)'],
        code: `<span class="type">int</span> parent[MAXN];
<span class="type">int</span> <span class="function">find</span>(<span class="type">int</span> x) {
    <span class="keyword">if</span> (parent[x] != x) 
        parent[x] = find(parent[x]); <span class="comment">// 路径压缩</span>
    <span class="keyword">return</span> parent[x];
}
<span class="type">void</span> <span class="function">unite</span>(<span class="type">int</span> x, <span class="type">int</span> y) {
    <span class="type">int</span> px = find(x), py = find(y);
    <span class="keyword">if</span> (px != py) parent[py] = px;
}`,
        problems:[
            { title: '合根植物 (蓝桥真题)', difficulty: 'medium', desc: '计算连通块数量', tags:['并查集'] },
            { title: '修改数组 (蓝桥真题)', difficulty: 'hard', desc: '并查集快速跳过已被占用的数字', tags: ['并查集巧妙应用'] }
        ]
    },

    // ================= 拔高篇 =================
    'dp': {
        title: '动态规划 (DP)',
        principle: `<h4>1. DP核心思想</h4>
        <p>把大问题拆解成互相重叠的小问题，并<strong>记住小问题的答案（状态数组）</strong>避免重复计算。你需要明确：<strong style="color:#d81b60">状态定义(dp[i]是什么)</strong> 与 <strong style="color:#d81b60">状态转移方程</strong>。</p>
        <h4>2. 蓝桥杯常考模型</h4>
        <ul>
            <li><strong>背包模型：</strong> 01背包（每种1个，倒序遍历体积）、完全背包（不限量，正序遍历体积）。</li>
            <li><strong>线性DP：</strong> LIS (最长上升子序列)、LCS (最长公共子序列)。</li>
            <li><strong>区间DP：</strong> 合并石子（枚举区间长度和分割点）。</li>
            <li><strong>状压DP：</strong> 糖果（用二进制数表示集合状态）。</li>
        </ul>`,
        complexity: { time: '状态数 × 转移复杂度', space: '一般可用滚动数组优化至O(N)' },
        stl: ['std::max', 'std::min', 'memset'],
        code: `<span class="comment">// 01背包 一维空间优化 (倒序)</span>
<span class="keyword">for</span> (<span class="type">int</span> i = 1; i &lt;= N; i++) {
    <span class="keyword">for</span> (<span class="type">int</span> j = V; j &gt;= weight[i]; j--) {
        dp[j] = max(dp[j], dp[j - weight[i]] + value[i]);
    }
}

<span class="comment">// 完全背包 (正序)</span>
<span class="keyword">for</span> (<span class="type">int</span> i = 1; i &lt;= N; i++) {
    <span class="keyword">for</span> (<span class="type">int</span> j = weight[i]; j &lt;= V; j++) {
        dp[j] = max(dp[j], dp[j - weight[i]] + value[i]);
    }
}`,
        problems:[
            { title: '包子凑数 (蓝桥真题)', difficulty: 'hard', desc: '完全背包判定', tags: ['完全背包', '数论'] },
            { title: '砝码称重 (蓝桥真题)', difficulty: 'hard', desc: '加上和减去物品的DP', tags: ['背包DP'] }
        ]
    },
    'graph': {
        title: '图论入门',
        principle: `<h4>1. 图的存储 (存图)</h4>
        <p>蓝桥杯强烈建议使用<strong>邻接表 <code>vector&lt;pair&lt;int,int&gt;&gt; adj[N]</code></strong> 存图，避免超内存。</p>
        <h4>2. 最短路算法 Dijkstra</h4>
        <p>用于求<strong>单源且无负权边</strong>的最短路。贪心思想：每次从未确定最短路的节点中，挑一个距离起点最近的点，用它去更新邻居（松弛操作）。使用 <code>priority_queue</code> 优化后复杂度 O(E log V)。</p>
        <h4>3. 最小生成树 Kruskal</h4>
        <p>把所有边按权值排序，利用<strong>并查集</strong>从小到大加边，不产生环即可。常用于“修路连通成本最小”问题。</p>`,
        complexity: { time: 'Dijkstra: O(E log V)', space: 'O(V + E)' },
        stl:['std::priority_queue', 'std::vector', 'std::pair', 'std::greater'],
        code: `<span class="comment">// 堆优化 Dijkstra 求最短路</span>
<span class="type">void</span> <span class="function">dijkstra</span>(<span class="type">int</span> s) {
    priority_queue&lt;pair&lt;<span class="type">int</span>,<span class="type">int</span>&gt;, vector&lt;pair&lt;<span class="type">int</span>,<span class="type">int</span>&gt;&gt;, greater&lt;pair&lt;<span class="type">int</span>,<span class="type">int</span>&gt;&gt;&gt; pq;
    memset(dist, 0x3f, <span class="keyword">sizeof</span>(dist));
    dist[s] = 0; pq.push({0, s});
    
    <span class="keyword">while</span>(!pq.empty()) {
        <span class="keyword">auto</span> [d, u] = pq.top(); pq.pop();
        <span class="keyword">if</span>(d &gt; dist[u]) <span class="keyword">continue</span>; <span class="comment">// 废弃的旧状态</span>
        
        <span class="keyword">for</span>(<span class="keyword">auto</span> edge : adj[u]) {
            <span class="type">int</span> v = edge.to, w = edge.weight;
            <span class="keyword">if</span>(dist[u] + w &lt; dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
}`,
        problems:[
            { title: '发现环 (蓝桥真题)', difficulty: 'medium', desc: '找无向图的环', tags:['拓扑排序/并查集'] },
            { title: '最短路', difficulty: 'medium', desc: '标准Dijkstra板子题', tags: ['Dijkstra'] }
        ]
    },
    'math': {
        title: '简单数论',
        principle: `<h4>1. 最大公约数 (GCD)与最小公倍数 (LCM)</h4>
        <p>C++17自带 <code>std::gcd(a, b)</code> 和 <code>std::lcm(a, b)</code>。或者手写辗转相除法：<code>return b == 0 ? a : gcd(b, a%b);</code></p>
        <h4>2. 快速幂与取模</h4>
        <p>求 $A^B \\pmod M$，因为B极大，不能直接用 <code>pow</code>。将B看作二进制，以 O(log B) 的速度乘倍解决。</p>
        <h4>3. 质数筛法</h4>
        <p><strong>埃氏筛：</strong> 从2开始，把每个质数的倍数划掉。优化版本是<strong>欧拉筛（线性筛）</strong>，保证每个合数只被其最小质因子筛去一次。</p>`,
        complexity: { time: '埃氏筛 O(N log log N)', space: 'O(N)' },
        stl:['std::numeric (gcd)'],
        code: `<span class="comment">// 快速幂求 (a^b) % mod</span>
<span class="type">long long</span> <span class="function">fast_pow</span>(<span class="type">long long</span> a, <span class="type">long long</span> b, <span class="type">long long</span> mod) {
    <span class="type">long long</span> res = 1;
    a %= mod;
    <span class="keyword">while</span> (b &gt; 0) {
        <span class="keyword">if</span> (b & 1) res = (res * a) % mod;
        a = (a * a) % mod;
        b &gt;&gt;= 1;
    }
    <span class="keyword">return</span> res;
}

<span class="comment">// 欧拉筛法 (O(N) 求素数)</span>
<span class="type">void</span> <span class="function">get_primes</span>(<span class="type">int</span> n) {
    <span class="keyword">for</span>(<span class="type">int</span> i=2; i&lt;=n; i++) {
        <span class="keyword">if</span>(!st[i]) primes.push_back(i);
        <span class="keyword">for</span>(<span class="type">int</span> p : primes) {
            <span class="keyword">if</span>(i * p &gt; n) <span class="keyword">break</span>;
            st[i * p] = <span class="keyword">true</span>;
            <span class="keyword">if</span>(i % p == 0) <span class="keyword">break</span>; <span class="comment">// 核心：只被最小质因子筛一次</span>
        }
    }
}`,
        problems:[
            { title: '等差数列 (蓝桥真题)', difficulty: 'medium', desc: '求项数最少的等差数列', tags: ['GCD'] },
            { title: '乘积尾零 (蓝桥真题)', difficulty: 'easy', desc: '质因子分解统计2和5的数量', tags: ['质因数'] }
        ]
    },
    'combinatorics': {
        title: '组合数学',
        principle: `<h4>1. 排列与组合基础公式</h4>
        <p>排列 $A_n^m = \\frac{n!}{(n-m)!}$，组合 $C_n^m = \\frac{n!}{m!(n-m)!}$。蓝桥杯中经常需要结果取模。</p>
        <h4>2. 杨辉三角</h4>
        <p>$C_n^m = C_{n-1}^m + C_{n-1}^{m-1}$，可以直接用二维数组递推求解较小的组合数，避免阶乘溢出和除法取模（逆元）问题。</p>
        <h4>3. 乘法逆元</h4>
        <p>在模意义下，不能直接进行除法运算。计算 $(A/B) \\pmod M$ 等价于计算 $A \\times B^{-1} \\pmod M$。当M为质数时，由费马小定理可知 $B^{-1} = B^{M-2} \\pmod M$，直接用快速幂求解即可。</p>`,
        complexity: { time: '杨辉三角递推 O(N²)', space: 'O(N²)' },
        stl:['std::vector'],
        code: `<span class="comment">// 递推杨辉三角求组合数 C(n, m) % MOD</span>
<span class="type">const int</span> MOD = 1e9 + 7;
<span class="type">int</span> C[1005][1005];

<span class="type">void</span> <span class="function">init_C</span>() {
    <span class="keyword">for</span> (<span class="type">int</span> i = 0; i &lt;= 1000; i++) {
        C[i][0] = 1; <span class="comment">// C(i,0) 均为 1</span>
        <span class="keyword">for</span> (<span class="type">int</span> j = 1; j &lt;= i; j++) {
            C[i][j] = (C[i-1][j] + C[i-1][j-1]) % MOD;
        }
    }
}`,
        problems:[
            { title: '杨辉三角形 (蓝桥真题)', difficulty: 'hard', desc: '在一个庞大的杨辉三角中找数字', tags:['组合数', '二分'] },
            { title: '数的大写', difficulty: 'medium', desc: '隔板法，排列组合应用', tags: ['组合数学'] }
        ]
    }
};

let currentAlgo = 'utils';
let animationInterval = null;
let animationTimeout = null;

function renderContent(algo) {
    const data = algoData[algo];
    const content = document.getElementById('main-content');
    
    content.innerHTML = `
        <section class="content-section">
            <h2>${data.title}</h2>
            <h3>📖 核心原理与竞赛技巧</h3>
            ${data.principle}
            <div class="complexity">
                <div class="complexity-item"><strong>时间复杂度</strong>${data.complexity.time}</div>
                <div class="complexity-item"><strong>空间复杂度</strong>${data.complexity.space}</div>
            </div>
            <h3>🔧 蓝桥杯重点 STL</h3>
            <div class="stl-tags">${data.stl.map(s => `<span class="stl-tag">${s.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</span>`).join('')}</div>
            <h3>💻 C++ 模板代码</h3>
            <div class="code-block">${data.code}</div>
        </section>
        
        <section class="content-section">
            <h2>🎬 可视化演示</h2>
            ${getVisualization(algo)}
        </section>
        
        <section class="content-section">
            <h2>📝 真题推荐 (去洛谷或蓝桥云课搜索)</h2>
            <div class="problems-grid">
                ${data.problems.map(p => `
                    <div class="problem-card">
                        <div class="problem-header">
                            <span class="problem-title">${p.title}</span>
                            <span class="difficulty diff-${p.difficulty}">${{easy:'简单',medium:'中等',hard:'困难'}[p.difficulty]}</span>
                        </div>
                        <p class="problem-desc">${p.desc}</p>
                        <div class="problem-tags">${p.tags.map(t => `<span class="problem-tag">${t}</span>`).join('')}</div>
                    </div>
                `).join('')}
            </div>
        </section>
    `;
    
    initVisualization(algo);
}

function getVisualization(algo) {
    // 为11个分类提供独立的演示容器结构
    const vMap = {
        'utils': `<p>演示 <code>next_permutation</code> 全排列枚举：</p>
                  <div class="step-info" id="step-text">点击开始演示</div>
                  <div class="visualization"><div class="canvas-container" id="canvas"></div></div>`,
        'prefix-diff': `<p>演示前缀和数组的生成过程：</p>
                        <div class="step-info" id="step-text">点击开始演示</div>
                        <div class="visualization"><div class="canvas-container" id="canvas"></div></div>`,
        'enum-twopointers': `<p>演示双指针滑动窗口寻找和 &ge; 12 的最小子数组：</p>
                             <div class="step-info" id="step-text">点击开始演示</div>
                             <div class="visualization"><div class="canvas-container" id="canvas"></div></div>`,
        'binary-search': `<p>演示二分查找目标值 13 的过程：</p>
                          <div class="step-info" id="step-text">点击开始演示</div>
                          <div class="visualization"><div class="canvas-container" id="canvas"></div></div>`,
        'search': `<p>演示 BFS 在无权图中的扩散寻路过程：</p>
                   <div class="step-info" id="step-text">点击开始演示</div>
                   <div class="visualization">
                       <div class="queue-container"><span class="queue-label">队列：</span><div class="queue-items" id="queue" style="display:flex;gap:5px;"></div></div>
                       <div class="canvas-container" id="canvas" style="height:300px;"><svg id="svg"></svg></div>
                   </div>`,
        'greedy': `<p>演示贪心区间调度：按结束时间排序，选取最多不重叠区间：</p>
                   <div class="step-info" id="step-text">点击开始演示</div>
                   <div class="visualization"><div class="canvas-container" id="canvas" style="align-items:flex-start; padding-left: 20px;"></div></div>`,
        'union-find': `<p>演示并查集的路径压缩与连通块合并：</p>
                       <div class="step-info" id="step-text">点击开始演示</div>
                       <div class="visualization"><div class="canvas-container" id="canvas"></div></div>`,
        'dp': `<p>演示 01 背包动态规划表 (自顶向下逐行推导)：物品[重量,价值]: [2,3], [3,4], [4,5], [5,6]，容量=8</p>
               <div class="step-info" id="step-text">点击开始演示</div>
               <div class="visualization"><div class="canvas-container" id="canvas" style="overflow-x:auto;"></div></div>`,
        'graph': `<p>演示 Dijkstra 最短路贪心松弛思想 (使用邻接节点距离更新)：</p>
                  <div class="step-info" id="step-text">点击开始演示</div>
                  <div class="visualization"><div class="canvas-container" id="canvas" style="height:300px;"><svg id="svg"></svg></div></div>`,
        'math': `<p>演示 埃氏筛法 寻找质数：</p>
                 <div class="step-info" id="step-text">点击开始演示</div>
                 <div class="visualization"><div class="canvas-container" id="canvas"></div></div>`,
        'combinatorics': `<p>演示利用杨辉三角递推生成组合数 C(n, m)：</p>
                          <div class="step-info" id="step-text">点击开始演示</div>
                          <div class="visualization"><div class="canvas-container" id="canvas" style="background:#fff;"></div></div>`
    };

    return vMap[algo] + `
        <div class="controls">
            <button class="btn btn-primary" id="start-btn">▶ 开始演示</button>
            <button class="btn btn-secondary" id="reset-btn">🔄 重置</button>
        </div>`;
}

function initVisualization(algo) {
    const startBtn = document.getElementById('start-btn');
    const resetBtn = document.getElementById('reset-btn');
    if (startBtn) startBtn.onclick = () => startAnimation(algo);
    if (resetBtn) resetBtn.onclick = () => { clearTimers(); renderContent(algo); };
}

function clearTimers() {
    if (animationInterval) clearInterval(animationInterval);
    if (animationTimeout) clearTimeout(animationTimeout);
}

function startAnimation(algo) {
    clearTimers();
    const map = {
        'utils': animateUtils, 'prefix-diff': animatePrefix, 'enum-twopointers': animateTwoPointers,
        'binary-search': animateBinarySearch, 'search': animateBFS, 'greedy': animateGreedy,
        'union-find': animateUnionFind, 'dp': animateKnapsack, 'graph': animateDijkstra,
        'math': animateMath, 'combinatorics': animateCombinatorics
    };
    if(map[algo]) map[algo]();
}

// ---------------- 动画实现区 ----------------
function animateUtils() {
    const canvas = document.getElementById('canvas');
    const step = document.getElementById('step-text');
    let a =[1, 2, 3];
    let html = `<div class="array-container" id="arr-c"></div>`;
    canvas.innerHTML = html;
    
    function draw() {
        document.getElementById('arr-c').innerHTML = a.map((v, i) => 
            `<div class="array-item highlight"><div class="value">${v}</div><div class="index">pos:${i}</div></div>`
        ).join('');
    }
    
    // JS手动模拟 next_permutation
    function nextPermutation(arr) {
        let i = arr.length - 2;
        while (i >= 0 && arr[i] >= arr[i + 1]) i--;
        if (i < 0) return false;
        let j = arr.length - 1;
        while (arr[j] <= arr[i]) j--;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        let l = i + 1, r = arr.length - 1;
        while (l < r) { [arr[l], arr[r]] = [arr[r], arr[l]]; l++; r--; }
        return true;
    }

    draw();
    step.textContent = `初始排列：[${a.join(', ')}]`;
    
    animationInterval = setInterval(() => {
        if (!nextPermutation(a)) {
            clearTimers();
            step.textContent = "全排列枚举结束！(恢复降序)";
            return;
        }
        draw();
        step.textContent = `下一种排列：[${a.join(', ')}]`;
    }, 1200);
}

function animatePrefix() {
    const canvas = document.getElementById('canvas');
    const step = document.getElementById('step-text');
    const arr = [3, 1, 4, 1, 5, 9];
    let sum = [0];
    for(let x of arr) sum.push(sum[sum.length-1]+x);

    canvas.innerHTML = `
        <div style="margin-bottom:20px;"><strong>原数组 A：</strong><div class="array-container" id="a-c"></div></div>
        <div><strong>前缀和数组 Sum：</strong><div class="array-container" id="s-c"></div></div>
    `;
    const ac = document.getElementById('a-c');
    const sc = document.getElementById('s-c');
    
    arr.forEach((v,i) => ac.innerHTML += `<div class="array-item"><div class="value">${v}</div><div class="index">${i+1}</div></div>`);
    sc.innerHTML += `<div class="array-item found"><div class="value">0</div><div class="index">0</div></div>`;
    
    let i = 1;
    step.textContent = "初始化 sum[0] = 0";
    animationInterval = setInterval(() => {
        if(i > arr.length) { clearTimers(); step.textContent = "前缀和构造完毕！查询[L,R]只需计算 sum[R]-sum[L-1]。"; return; }
        
        ac.children[i-1].classList.add('highlight');
        sc.innerHTML += `<div class="array-item found" style="animation: scaleIn 0.3s"><div class="value">${sum[i]}</div><div class="index">${i}</div></div>`;
        step.textContent = `计算 sum[${i}] = sum[${i-1}] + a[${i}] = ${sum[i-1]} + ${arr[i-1]} = ${sum[i]}`;
        
        setTimeout(() => ac.children[i-1].classList.remove('highlight'), 800);
        i++;
    }, 1200);
}

function animateTwoPointers() {
    const canvas = document.getElementById('canvas');
    const stepText = document.getElementById('step-text');
    const arr = [1,2,3,4,5,6,7];
    const target = 12;
    
    canvas.innerHTML = '<div class="array-container" id="array-container"></div>';
    const container = document.getElementById('array-container');
    arr.forEach((val, i) => container.innerHTML += `<div class="array-item" id="item-${i}"><div class="value">${val}</div><div class="index">${i}</div></div>`);
    
    let left = 0, right = 0, sum = 0, minLen = 999;
    
    animationInterval = setInterval(() => {
        if (right >= arr.length) {
            clearTimers();
            stepText.textContent = `枚举结束。找到最短长度：${minLen}`;
            return;
        }
        document.querySelectorAll('.array-item').forEach(el => el.className = 'array-item');
        sum += arr[right];
        
        for(let k=left; k<=right; k++) document.getElementById(`item-${k}`).classList.add('highlight');
        
        stepText.textContent = `Right指针右移：[${left}, ${right}], 窗口和 = ${sum}`;
        
        if (sum >= target) {
            minLen = Math.min(minLen, right - left + 1);
            setTimeout(() => {
                stepText.textContent = `和 ${sum} >= ${target}，Left指针尝试收缩并记录最短长度 ${minLen}`;
                for(let k=left; k<=right; k++) document.getElementById(`item-${k}`).classList.add('found');
                sum -= arr[left];
                sum -= arr[right]; // Undo right add, let loop add it next frame or logic
                // Simple visualization logic adjust for sequence
                sum += arr[right]; 
                sum -= arr[left];
                left++;
                right--; // Keep right to retry next logic step if still valid, simplified here
            }, 800);
        }
        right++;
    }, 1500);
}

function animateBinarySearch() {
    const canvas = document.getElementById('canvas');
    const stepText = document.getElementById('step-text');
    const arr =[1,3,5,7,9,11,13,15,17,19];
    const target = 13;
    
    canvas.innerHTML = '<div class="array-container" id="array-container"></div>';
    const container = document.getElementById('array-container');
    arr.forEach((val, i) => container.innerHTML += `<div class="array-item" id="item-${i}"><div class="value">${val}</div><div class="index">${i}</div></div>`);
    
    let left = 0, right = arr.length - 1;
    
    animationInterval = setInterval(() => {
        if (left > right) { clearTimers(); stepText.textContent = '未找到目标值'; return; }
        
        document.querySelectorAll('.array-item').forEach(el => el.className = 'array-item');
        for (let i = 0; i < left; i++) document.getElementById(`item-${i}`).classList.add('excluded');
        for (let i = right + 1; i < arr.length; i++) document.getElementById(`item-${i}`).classList.add('excluded');
        
        const mid = Math.floor((left + right) / 2);
        document.getElementById(`item-${mid}`).classList.add('highlight');
        stepText.textContent = `搜索区间 [${left}, ${right}], 中点 mid = ${mid}, 值 = ${arr[mid]}`;
        
        if (arr[mid] === target) {
            clearTimers();
            document.getElementById(`item-${mid}`).classList.add('found');
            stepText.textContent = `🎉 找到目标值 13！位置在索引 ${mid}，时间复杂度O(log N)。`;
            return;
        }
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }, 1500);
}

function animateBFS() {
    const canvas = document.getElementById('canvas');
    const queue = document.getElementById('queue');
    const stepText = document.getElementById('step-text');
    
    const graph = [[1,2],[0,3,4],[0,5],[1],[1],[2]];
    const pos =[{x:250,y:50},{x:150,y:150},{x:350,y:150},{x:50,y:250},{x:250,y:250},{x:450,y:250}];
    
    const svg = document.getElementById('svg');
    svg.innerHTML = '';
    graph.forEach((n, i) => n.forEach(j => {
        if(i < j) svg.innerHTML += `<line x1="${pos[i].x}" y1="${pos[i].y}" x2="${pos[j].x}" y2="${pos[j].y}" stroke="#ccc" stroke-width="2"/>`;
    }));
    
    pos.forEach((p, i) => canvas.innerHTML += `<div class="graph-node" id="n-${i}" style="left:${p.x-22}px; top:${p.y-22}px;">${i}</div>`);
    
    const visited = Array(6).fill(false);
    const q = [0]; visited[0] = true;
    
    const updQ = () => queue.innerHTML = q.map(n => `<div class="queue-item">${n}</div>`).join('');
    updQ();
    stepText.textContent = '初始化：节点 0 入队。';
    
    animationInterval = setInterval(() => {
        if(q.length === 0) { clearTimers(); stepText.textContent = 'BFS遍历完成！每个点都计算出了最短步数。'; return; }
        
        const node = q.shift();
        document.getElementById(`n-${node}`).className = 'graph-node visited';
        stepText.textContent = `节点 ${node} 出队，扫描它的邻居节点...`;
        
        setTimeout(() => {
            graph[node].forEach(next => {
                if(!visited[next]) {
                    visited[next] = true;
                    q.push(next);
                    document.getElementById(`n-${next}`).className = 'graph-node current';
                }
            });
            updQ();
        }, 600);
    }, 1800);
}

function animateGreedy() {
    const canvas = document.getElementById('canvas');
    const step = document.getElementById('step-text');
    const itvs =[{s:1, e:4}, {s:3, e:5}, {s:0, e:6}, {s:5, e:7}, {s:3, e:8}, {s:5, e:9}, {s:6, e:10}, {s:8, e:11}];
    
    // 按结束时间排序
    itvs.sort((a,b) => a.e - b.e);
    
    canvas.innerHTML = `<div style="position:relative; width:100%; height: 100%;" id="greedy-c"></div>`;
    const container = document.getElementById('greedy-c');
    
    // 绘制标尺
    for(let i=0; i<=12; i++) {
        container.innerHTML += `<div style="position:absolute; left:${i*8}%; top:0; height:100%; border-left:1px dashed #eee;"></div>`;
        container.innerHTML += `<div style="position:absolute; left:${i*8}%; bottom:0; font-size:12px; transform:translateX(-50%);">${i}</div>`;
    }
    
    itvs.forEach((v, i) => {
        container.innerHTML += `<div class="interval-box" id="i-${i}" style="left:${v.s*8}%; width:${(v.e-v.s)*8}%; top:${i*35 + 20}px;">[${v.s}, ${v.e}]</div>`;
    });
    
    let idx = 0, lastEnd = -1;
    step.textContent = "将所有区间按【结束时间】从小到大排好序。";
    
    animationInterval = setInterval(() => {
        if(idx >= itvs.length) { clearTimers(); step.textContent = "贪心挑选完毕，得到最多不重叠区间数。"; return; }
        
        const v = itvs[idx];
        const el = document.getElementById(`i-${idx}`);
        
        if(v.s >= lastEnd) {
            el.classList.add('selected');
            lastEnd = v.e;
            step.textContent = `区间[${v.s}, ${v.e}] 开始时间 >= 上一个结束时间(${lastEnd})，【选中】它！`;
        } else {
            el.classList.add('rejected');
            step.textContent = `区间 [${v.s}, ${v.e}] 发生重叠冲突，【舍弃】。`;
        }
        idx++;
    }, 1200);
}

function animateUnionFind() {
    const canvas = document.getElementById('canvas');
    const step = document.getElementById('step-text');
    canvas.innerHTML = '<div class="uf-container" id="uf-container"></div>';
    const c = document.getElementById('uf-container');
    
    let parent =[0,1,2,3,4,5];
    parent.forEach(i => c.innerHTML += `<div class="uf-node" id="u-${i}"><div class="node-id">${i}</div><div class="parent-id">fa: ${i}</div></div>`);
    
    const ops = [[1,2], [3,4], [2,3],[0,1]];
    let idx = 0;
    
    function find(x) { return parent[x] == x ? x : (parent[x] = find(parent[x])); }
    
    animationInterval = setInterval(() => {
        if(idx >= ops.length) { clearTimers(); step.textContent = '合并完成，当前连通块分为两组。'; return; }
        const [u, v] = ops[idx];
        let rootU = find(u), rootV = find(v);
        
        if(rootU !== rootV) {
            parent[rootV] = rootU; // rootU 成为父节点
            document.getElementById(`u-${rootV}`).classList.add('merged');
            // update UI blindly for demo
            for(let i=0; i<6; i++) {
                document.getElementById(`u-${i}`).querySelector('.parent-id').textContent = `fa: ${find(i)}`;
            }
        }
        step.textContent = `操作：合并节点 ${u} 和 ${v} 所在的连通块`;
        idx++;
    }, 1500);
}

function animateKnapsack() {
    const canvas = document.getElementById('canvas');
    const stepText = document.getElementById('step-text');
    
    const W = [2, 3, 4, 5], V = [3, 4, 5, 6], maxV = 8, N = 4;
    
    canvas.innerHTML = `<table class="dp-table" id="dp-table"></table>`;
    const tb = document.getElementById('dp-table');
    const dp = Array(N+1).fill(0).map(() => Array(maxV+1).fill(0));
    
    let html = '<tr><td>容/物</td>';
    for(let j=0; j<=maxV; j++) html += `<td>${j}</td>`;
    html += '</tr>';
    for(let i=0; i<=N; i++) {
        html += `<tr><td>${i===0?'空':`W${W[i-1]} V${V[i-1]}`}</td>`;
        for(let j=0; j<=maxV; j++) html += `<td id="d-${i}-${j}">0</td>`;
        html += '</tr>';
    }
    tb.innerHTML = html;
    
    // 初始化 0 行已全是 0
    let i=1, j=1;
    stepText.textContent = "开始计算状态转移方程...";
    
    animationInterval = setInterval(() => {
        if(i > N) {
            clearTimers(); 
            document.getElementById(`d-${N}-${maxV}`).classList.add('result');
            stepText.textContent = `计算完毕，最大价值为 ${dp[N][maxV]}。`;
            return; 
        }
        
        document.querySelectorAll('.dp-table td').forEach(el => el.classList.remove('current'));
        
        let w = W[i-1], v = V[i-1];
        if(j >= w) dp[i][j] = Math.max(dp[i-1][j], dp[i-1][j-w] + v);
        else dp[i][j] = dp[i-1][j];
        
        let cell = document.getElementById(`d-${i}-${j}`);
        cell.textContent = dp[i][j];
        cell.classList.add('current', 'filled');
        
        if(j >= w) stepText.textContent = `dp[${i}][${j}] = max(不选: ${dp[i-1][j]}, 选: dp[${i-1}][${j-w}] + ${v}) = ${dp[i][j]}`;
        else stepText.textContent = `容量 ${j} < 物品重量 ${w}，无法装入，直接继承上方 dp[${i-1}][${j}] = ${dp[i][j]}`;
        
        j++;
        if(j > maxV) { i++; j=1; }
    }, 200);
}

function animateDijkstra() {
    const canvas = document.getElementById('canvas');
    const step = document.getElementById('step-text');
    
    const nodes =[{x:100,y:150},{x:250,y:50},{x:250,y:250},{x:400,y:150}];
    const edges = [[0,1,2], [0,2,5], [1,2,1],[1,3,4], [2,3,2]];
    
    const svg = document.getElementById('svg');
    svg.innerHTML = '';
    edges.forEach(e => {
        const u = nodes[e[0]], v = nodes[e[1]];
        svg.innerHTML += `<line x1="${u.x}" y1="${u.y}" x2="${v.x}" y2="${v.y}" stroke="#aaa" stroke-width="2" />`;
        svg.innerHTML += `<text x="${(u.x+v.x)/2}" y="${(u.y+v.y)/2 - 10}" fill="#d81b60" font-weight="bold">${e[2]}</text>`;
    });
    
    nodes.forEach((p, i) => canvas.innerHTML += `<div class="graph-node" id="n-${i}" style="left:${p.x-22}px; top:${p.y-22}px;">${i}</div>`);
    
    step.textContent = "Dijkstra: 从节点 0 开始，贪心找最近且未确定最短路的点更新其邻居。";
}

function animateMath() {
    const canvas = document.getElementById('canvas');
    const step = document.getElementById('step-text');
    canvas.innerHTML = '<div class="math-grid" id="m-g"></div>';
    const grid = document.getElementById('m-g');
    
    for(let i=1; i<=30; i++) {
        grid.innerHTML += `<div class="math-cell" id="m-${i}">${i}</div>`;
    }
    document.getElementById('m-1').classList.add('composite'); // 1 不是质数
    
    let st = Array(31).fill(false);
    let i = 2, p = 2;
    
    step.textContent = "埃氏筛法：从 2 开始，划去质数的倍数。";
    
    function markMultiples() {
        if(p > 30) { clearTimers(); step.textContent = "范围内质数全部找出（绿色）！"; return; }
        if(!st[p]) {
            document.getElementById(`m-${p}`).classList.add('prime', 'current');
            step.textContent = `找到质数 ${p}，正在划去它的倍数...`;
            
            let j = p * p; // 优化：从 p^2 开始划
            if(j > 30) { p++; setTimeout(markMultiples, 500); return; }
            
            let drawMult = setInterval(() => {
                if(j > 30) {
                    clearInterval(drawMult);
                    document.getElementById(`m-${p}`).classList.remove('current');
                    p++;
                    setTimeout(markMultiples, 500);
                    return;
                }
                st[j] = true;
                document.getElementById(`m-${j}`).classList.add('composite');
                j += p;
            }, 300);
        } else {
            p++;
            markMultiples();
        }
    }
    setTimeout(markMultiples, 1000);
}

function animateCombinatorics() {
    const canvas = document.getElementById('canvas');
    const step = document.getElementById('step-text');
    canvas.innerHTML = '<div id="pascal" style="padding:20px;"></div>';
    const p = document.getElementById('pascal');
    
    let rows = 6;
    let r = 0;
    
    step.textContent = "利用公式 C(i, j) = C(i-1, j-1) + C(i-1, j) 生成杨辉三角。";
    
    animationInterval = setInterval(() => {
        if(r >= rows) { clearTimers(); step.textContent = "生成完毕！C(n, m) 即为第 n 行第 m 列的值。"; return; }
        
        let rowDiv = document.createElement('div');
        rowDiv.className = 'pascal-row';
        p.appendChild(rowDiv);
        
        let C = 1;
        for(let c = 0; c <= r; c++) {
            let cell = document.createElement('div');
            cell.className = 'pascal-cell';
            cell.textContent = C;
            rowDiv.appendChild(cell);
            
            setTimeout(() => cell.classList.add('show'), c * 150);
            C = C * (r - c) / (c + 1);
        }
        r++;
    }, 1200);
}

// 事件绑定
document.querySelectorAll('.algo-item').forEach(item => {
    item.addEventListener('click', function() {
        clearTimers();
        document.querySelectorAll('.algo-item').forEach(el => el.classList.remove('active'));
        this.classList.add('active');
        currentAlgo = this.dataset.algo;
        renderContent(currentAlgo);
    });
});

// 初始化加载第一个算法
renderContent(currentAlgo);