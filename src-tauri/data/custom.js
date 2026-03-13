window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// console.log("YT script loaded");
等待播放器加载
function setupYouTube() {

    const player = document.querySelector('video');
    if (!player) return;

    console.log("YouTube helper loaded");
    // 自动最高画质
    const setQuality = () => {
        const settings = document.querySelector('.ytp-settings-button');
        if (settings) settings.click();

        setTimeout(() => {
            const items = [...document.querySelectorAll('.ytp-menuitem')];
            const quality = items.find(i => i.innerText.includes('Quality'));
            if (quality) quality.click();

            setTimeout(() => {
                const qualities = [...document.querySelectorAll('.ytp-menuitem')];
                if (qualities.length) qualities[0].click(); // 最高
            }, 300);
        }, 300);
    };

    // 自动字幕
    const enableSubtitles = () => {
        const btn = document.querySelector('.ytp-subtitles-button');
        if (btn && btn.getAttribute('aria-pressed') === "false") {
            btn.click();
        }
    };

    // 自动跳广告
    const skipAds = () => {
        const skip = document.querySelector('.ytp-ad-skip-button');
        if (skip) skip.click();
    };

    // 每2秒检测
    setInterval(() => {
        enableSubtitles();
        skipAds();
    }, 2000);

    setQuality();
}

// 页面变化监听
const observer = new MutationObserver(() => {
    setupYouTube();
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

setupYouTube();
