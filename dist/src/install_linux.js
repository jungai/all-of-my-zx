#!/usr/bin/env zx
import "zx/globals";
void (async () => {
    // path
    const homeDir = await os.homedir();
    const zshCustom = `${homeDir}/.oh-my-zsh/custom`;
    const removeDir = [`${zshCustom}/plugins`];
    function echoStart(msg = "") {
        console.log(chalk.yellow(`🚀 -> install ${msg}`));
    }
    function echoNote(msg = "") {
        console.log(chalk.yellow(`📌 ${msg}`));
    }
    function echoEnd(msg = "") {
        console.log(chalk.yellow(`🍭 done ${msg}`));
    }
    async function beforeAll() {
        echoNote("before all");
        await $ `sudo apt update -y`;
        await $ `sudo apt upgrade -y`;
        echoNote("clean");
        await Promise.all(removeDir.map((dir) => $ `rm -rf ${dir}`));
    }
    async function setupScriptToZsh(name = "Setup Some Script") { }
    // TODO: Asdf
    async function setupAsdf(name = "Asdf") {
        echoStart(name);
        await $ `git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.8.1`;
        // prepare for node
        await $ `sudo apt install -y dirmngr gpg`;
        echoEnd(name);
    }
    // TODO: Docker (wsl do not install docker)
    async function setupDocker(name = "Docker") { }
    async function setupLinuxBrew(name = "Linux Brew") {
        echoStart(name);
        await $ `git clone https://github.com/Homebrew/brew ~/.linuxbrew/Homebrew`;
        await $ `mkdir ~/.linuxbrew/bin`;
        await $ `ln -s ~/.linuxbrew/Homebrew/bin/brew ~/.linuxbrew/bin`;
        await $ `eval $(~/.linuxbrew/bin/brew shellenv)`;
        echoEnd(name);
    }
    async function setupZsh(name = "Zsh") {
        echoStart(name);
        await $ `sudo apt install -y zsh`;
        await $ `zsh --version`;
        echoStart("Oh My Zsh");
        await $ `sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"`;
        echoStart("Zsh Syntax");
        await $ `git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${zshCustom}/plugins/zsh-syntax-highlighting`;
        echoStart("Zsh AutoSuggestion");
        await $ `git clone https://github.com/zsh-users/zsh-autosuggestions ${zshCustom}/plugins/zsh-autosuggestions`;
        // echoStart('Go into Zsh')
        // await $`zsh`
        // TODO: script break when input value
        // echoNote('set default shell')
        // await $`chsh -s $(which zsh)`
        echoEnd(name);
    }
    try {
        await beforeAll();
        await setupZsh();
        await setupLinuxBrew();
        await setupAsdf();
        await setupScriptToZsh();
        // TODO: check os before call
        // await setupDocker()
    }
    catch (error) {
        console.log(`Exit code: ${error.exitCode}`);
        console.log(`Error: ${error.stderr}`);
    }
})();
