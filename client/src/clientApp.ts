// import i18n from "@root/i18n";

// // 当前i18n配置已支持语言自动切换，客户端下默认会跟随用户浏览器语言设置。例如，若用户浏览器语言为 zh-CN，则界面将显示为简体中文。
// console.log("(client)：", i18n.t("welcome_game"));
// console.log("(client)：", i18n.t("welcome_ap"));
// console.log(
//   "(client)：",
//   i18n.t("navigator.language", { language: navigator.language })
// );

const ui_screen = UiScreen.getAllScreen().find((obj) => obj.name === "screen") as UiBox;
const bg = ui_screen.findChildByName("bg") as UiBox;
const uiScale = UiScale.create();
uiScale.scale = screenWidth / 1800; // 按宽度进行缩放，预设渲染分辨率x值为 1366px
ui_screen.uiScale = uiScale;
const arrow = ui_screen.findChildByName('hideorshow')as UiBox
const command = ui_screen.findChildByName('command')as UiBox
const text1 = bg.findChildByName('text-1')as UiText
const text2 = bg.findChildByName('text-2')as UiText
const text4 = bg.findChildByName('text-4')as UiText
const text6 = bg.findChildByName('text-6')as UiText
const text8 = bg.findChildByName('text-8')as UiText
const text10 = bg.findChildByName('text-10')as UiText
const text11 = arrow.findChildByName('text-11')as UiText
const text13 = bg.findChildByName('text-13')as UiText
const img1 = bg.findChildByName('image-1')as UiImage
const zxcommand = command.findChildByName('image-2')as UiImage
const cmdneirong = command.findChildByName('commandinput')as UiInput
async function sendandclear(cmdneirong:UiInput, zxcommand:UiImage, ok:UiText) {
    zxcommand.visible = false;
    ok.visible = false;
    remoteChannel.sendServerEvent({
        type: 'zxcommand',
        cmd: cmdneirong.textContent
    });
    cmdneirong.textContent = '';
    await sleep(3000);
    zxcommand.visible = true;
    ok.visible = true;
}
// async function hide(object, y) {
//     while (object.position.offset.y > y + 1) {
//         object.position.offset.y += (y - object.position.offset.y) / 50;
//         await sleep(1);
//     }
//     object.position.offset.y = y;
// }
// async function show(object, y) {
//     while (object.position.offset.y < y - 1) {
//         object.position.offset.y += (y - object.position.offset.y) / 50;
//         await sleep(1);
//     }
//     object.position.offset.y = y;
// }
arrow.events.on("pointerdown", async () => {
    if (arrow.position.offset.y > 0) {
        while (arrow.position.offset.y > 1) {
            arrow.position.offset.y += (0 - arrow.position.offset.y) / 50;
            await sleep(1);
        }
        arrow.position.offset.y = 0;
        while (bg.position.offset.y > -378 + 1) {
            bg.position.offset.y += (-378 - bg.position.offset.y) / 50;
            await sleep(1);
        }
        bg.position.offset.y = -378;
        text11.textContent = '↓';
    }
    else {
        while (arrow.position.offset.y < 331 - 1) {
            arrow.position.offset.y += (331 - arrow.position.offset.y) / 50;
            await sleep(1);
        }
        arrow.position.offset.y = 331;
        while (bg.position.offset.y < 0 - 1) {
            bg.position.offset.y += (0 - bg.position.offset.y) / 50;
            await sleep(1);
        }
        bg.position.offset.y = 0;
        text11.textContent = '↑';
    }
});
zxcommand.events.on("pointerdown", () => {
    let temp1 = ui_screen.findChildByName('command') as UiBox;
    let temp2 = temp1.findChildByName('text-9') as UiText;
    sendandclear(cmdneirong, zxcommand, temp2);
});
remoteChannel.events.on("client", (arg) => {
    if (arg.type == 'command') {
        if (arg.args == 'opencmd') {
            command.visible = true;
        }
        else if (arg.args == 'closecmd') {
            command.visible = false;
        }
        else if (arg.args == 'close') {
            ui_screen.visible = false;
        }
        else if (arg.args == 'open') {
            ui_screen.visible = true;
        }
    }
    else if (arg.type == 'basicinfo') {
        text1.textContent = arg.args[0];
        text2.textContent = arg.args[1];
        img1.image = arg.args[2];
    }
    else if (arg.type == 'tick') {
        text4.textContent = arg.args[0];
        text6.textContent = String(arg.args[1]);
        text8.textContent = arg.args[2];
        text10.textContent = String(arg.args[3]) + '(不包含代码管理员)';
        text13.textContent = String(arg.args[4]);
    }
});
