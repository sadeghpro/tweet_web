import TweetWeb from "./src/TweetWeb";

(async () => {
    const tweetWeb = await TweetWeb.create({
        args: ['--no-sandbox'],
        executablePath: "/usr/bin/google-chrome",
        headless: false,
    })
    console.log(await tweetWeb.getPost('https://x.com/notelonmuskkkk/status/1728682129289040278', 20000));
    console.log(await tweetWeb.getPost('https://twitter.com/H_umdard/status/1728683855044063363'));
})();