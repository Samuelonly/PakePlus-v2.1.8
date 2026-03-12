window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// AI 记忆脚本模板
(async function() {
    if (!window.__TAURI__) {
        console.log("❌ 不在 Tauri 环境，跳过");
        return;
    }
    
    console.log("✅ chatgpt 记忆脚本启动");
    
    const { writeTextFile, readTextFile, mkdir } = window.__TAURI__.fs;
    const { join } = window.__TAURI__.path;
    const { homeDir } = window.__TAURI__.path;
    
    try {
        const HOME = await homeDir();
        const ICLOUD_DIR = await join(HOME, "Library/Mobile Documents/com~apple~CloudDocs/AI_Memory");
        const MEMORY_FILE = await join(ICLOUD_DIR, "chatgpt_memory.json");
        
        console.log("📁 记忆文件:", MEMORY_FILE);
        
        await mkdir(ICLOUD_DIR, { recursive: true });
        
        async function loadMemory() {
            try {
                const data = await readTextFile(MEMORY_FILE);
                return JSON.parse(data);
            } catch {
                return { lastSession: null };
            }
        }
        
        async function saveMemory(memory) {
            await writeTextFile(MEMORY_FILE, JSON.stringify(memory, null, 2));
            console.log("💾 记忆已保存");
        }
        
        function extractChat() {
            const messages = [];
            const selectors = [".whitespace-pre-wrap", ".markdown"];
            for (let selector of selectors) {
                const elements = document.querySelectorAll(selector);
                if (elements.length > 0) {
                    elements.forEach(el => messages.push(el.textContent.trim()));
                    break;
                }
            }
            return messages.slice(-5);
        }
        
        const memory = await loadMemory();
        
        window.addEventListener("beforeunload", async () => {
            const messages = extractChat();
            if (messages.length > 0) {
                memory.lastSession = {
                    messages: messages,
                    timestamp: new Date().toISOString()
                };
                await saveMemory(memory);
            }
        });
        
        console.log("🎯 chatgpt 脚本加载完成");
    } catch (error) {
        console.error("❌ 错误:", error);
    }
})();
