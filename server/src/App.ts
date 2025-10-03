console.clear()
import i18n from "@root/i18n";
// 变量等
var admin:string[] = []
var adminpro:string[] = ['阿兹卡班毕业生','奶油a','羽岚.龍族[原]:Aoken','烤得酥脆的笨鼠','蓝鱼I恒星']
var logs:string[] = []
var lzxglist:string[] = []
var lastmsg:string = ''
// 处理建造时出现的冗余地形 backslash
for(let x=0;x<=127;x++){
    for(let y=0;y<=127;y++){
        for(let z=0;z<=127;z++){
            if(voxels.getVoxelId(x,y,z) == 491){
                voxels.setVoxel(x,y,z,0)
            }
        }
    }
}
// 函数
function init_player_ablity(entity:GamePlayerEntity){
    entity.player.jumpPower = 0.9
    entity.player.doubleJumpPower = 0.9
    entity.player.enableDoubleJump = true
    entity.player.walkSpeed = 0.22
    entity.player.runSpeed = 0.4
    entity.player.walkAcceleration = 0.19
    entity.player.runAcceleration = 0.35
    entity.player.crouchSpeed = 0.1;
    entity.player.crouchAcceleration = 0.09;
    entity.player.reverseInputDirection = GameInputDirection.NONE
}
function check_player(entity:GamePlayerEntity){
    if(32<=entity.position.z&&entity.position.z<=40&&entity.position.y<=5){
        init_player_ablity(entity)
        entity.player.jumpPower = Infinity
        entity.player.enableDoubleJump = false
    }
    else if(80<=entity.position.z&&entity.position.z<=88&&entity.position.y<=8){
        init_player_ablity(entity)
        entity.player.walkSpeed = 5
        entity.player.runSpeed = 5
        entity.player.walkAcceleration = 1
        entity.player.runAcceleration = 1
        entity.player.crouchSpeed = 0;
        entity.player.crouchAcceleration = 0;
        entity.player.jumpPower = Infinity
        entity.player.enableDoubleJump = false
    }
    else if(88<=entity.position.z&&entity.position.z<=96&&entity.position.y<=8&&entity.position.x>=64&&entity.player.spectator==false){
        init_player_ablity(entity)
        entity.player.reverseInputDirection = GameInputDirection.BOTH;
        entity.player.jumpPower = Infinity
        entity.player.enableDoubleJump = false
    }
    else if(88<=entity.position.z&&entity.position.z<=96&&entity.position.y<=8&&entity.player.spectator==false){
        init_player_ablity(entity)
        entity.player.jumpPower = Infinity
        entity.player.enableDoubleJump = false
    }
    else if(104<=entity.position.z&&entity.position.z<=112&&entity.position.y<=11&&entity.player.spectator==false){
        init_player_ablity(entity)
        if(entity.position.x>=64){
            entity.player.reverseInputDirection = GameInputDirection.BOTH;
        }
        entity.player.jumpPower = Infinity
        entity.player.enableDoubleJump = false
        entity.player.walkSpeed = 5
        entity.player.runSpeed = 5
        entity.player.walkAcceleration = 1
        entity.player.runAcceleration = 1
        entity.player.crouchSpeed = 0;
        entity.player.crouchAcceleration = 0;
    }
    else if(24<=entity.position.z&&entity.position.z<=32&&40<=entity.position.y&&entity.position.y<=80&&entity.player.spectator==false){
        init_player_ablity(entity)
        entity.player.jumpPower=0.7
        entity.player.doubleJumpPower=0.7
    }
    else{
        init_player_ablity(entity)
    }
}
function log(log:string,entity?:GamePlayerEntity){
    if(entity){
        logs = [`[${entity.player.name}] ${log}`, ...logs]
        console.log(`[${entity.player.name}] ${log}`)
    }
    else{
        logs = [log,...logs]
        console.log(log)
    }
}
async function dialog_with_button(entity:GamePlayerEntity,title:string,content:string,options:string[]){
    let ret = await entity.player.dialog({
        type: GameDialogType.SELECT,
        title: title,
        content: content,
        options: options,
    })
    return ret
}
function reminder(entity:GamePlayerEntity){
    if(entity.position.y<=30){
        if(entity.position.z<=8){
            dialog_with_button(entity,
                i18n.t('tutorial.tutorial', { lng: entity.lang }),
                i18n.t('tutorial.tutorial1', { lng: entity.lang, name: entity.player.name }),
                [i18n.t('tutorial.know', { lng: entity.lang })])
        }
        else if(entity.position.z<=16){
            dialog_with_button(entity,
                i18n.t('tutorial.tutorial', { lng: entity.lang }),
                i18n.t('tutorial.tutorial2', { lng: entity.lang }),
                [i18n.t('tutorial.know', { lng: entity.lang })])
        }
        else if(entity.position.z<=24){
            dialog_with_button(entity,
                i18n.t('tutorial.tutorial', { lng: entity.lang }),
                i18n.t('tutorial.tutorial3', { lng: entity.lang }),
                [i18n.t('tutorial.know', { lng: entity.lang })])
        }
        else if(entity.position.z<=32){
            dialog_with_button(entity,
                i18n.t('level_reminder.reminder', { lng: entity.lang }),
                i18n.t('level_reminder.level1', { lng: entity.lang }),
                [i18n.t('tutorial.know', { lng: entity.lang })])
        }
        else if(entity.position.z<=40){
            dialog_with_button(entity,
                i18n.t('level_reminder.reminder', { lng: entity.lang }),
                i18n.t('level_reminder.level2', { lng: entity.lang }),
                [i18n.t('tutorial.know', { lng: entity.lang })])
        }else if(entity.position.z<=80){}
        else if(entity.position.z<=88){
            dialog_with_button(entity,
                i18n.t('level_reminder.reminder', { lng: entity.lang }),
                i18n.t('level_reminder.level7', { lng: entity.lang }),
                [i18n.t('tutorial.know', { lng: entity.lang })])
        }
        else if(entity.position.z<=96){
            dialog_with_button(entity,
                i18n.t('level_reminder.reminder', { lng: entity.lang }),
                i18n.t('level_reminder.level8', { lng: entity.lang }),
                [i18n.t('tutorial.know', { lng: entity.lang })])
        }else if(entity.position.z<=104){}
        else if(entity.position.z<=112){
            dialog_with_button(entity,
                i18n.t('level_reminder.reminder', { lng: entity.lang }),
                i18n.t('level_reminder.level10', { lng: entity.lang }),
                [i18n.t('tutorial.know', { lng: entity.lang })])
        }
    }
    else if(entity.position.y<=79){
        if(entity.position.z<=8){
            dialog_with_button(entity,
                i18n.t('level_reminder.reminder', { lng: entity.lang }),
                i18n.t('level_reminder.level15', { lng: entity.lang }),
                [i18n.t('tutorial.know', { lng: entity.lang })])
        }
    }
}
function find(name:string){
    world.querySelectorAll('player').forEach((e)=>{
        if(e.player.name==name){
            return e
        }
    })
}
function reborn(entity:GamePlayerEntity){
    // log(`重生，重生前维度：${entity.dimension==1?`黑`:`白`}，重生点维度：${entity.cundang_dimension==1?`黑`:`白`}`,entity)
    entity.player.directMessage(i18n.t('directmsgs.respawn', { lng: entity.lang }))
    entity.player.forceRespawn()
    entity.dimension=entity.cundang_dimension
}
async function dialog(title:string,content:string,entity:GamePlayerEntity){
    const result = await entity.player.dialog({
        type: GameDialogType.TEXT,
        title: title,
        content: content,
    });
}
function use_duihuanma(entity:GamePlayerEntity){
    if(entity.used_duihuanma.includes(entity.duihuanma)==true){
        dialog(i18n.t('dialogs.error', {lng: entity.lang}),i18n.t('dialogs.dhm_already_used', {lng : entity.lang }),entity)
        return
    }
    try{
        if(entity.duihuanma){
            entity.player.cancelDialogs()
        }
        const date = new Date(Date.now());
        const year = date.getFullYear()
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes();
        // if(entity.duihuanma.startsWith('wansheng_code')){
        //     if(entity.duihuanma.indexOf('&')!=-1){
        //         entity.duihuanmainlist = entity.duihuanma.split('&')
        //         console.log(entity.duihuanmainlist)
        //         if(entity.duihuanmainlist[1]==String(entity.player.userId*3+2023)&&entity.duihuanmainlist[2]==String(entity.player.name.length)&&entity.duihuanmainlist[5]==String(month+day)&&entity.duihuanmainlist[6]==String(hour)&&parseInt(entity.duihuanmainlist[8])/3%1==0){
        //             if(((parseInt(entity.duihuanmainlist[3])-99)/2)%9==parseInt(entity.duihuanmainlist[4])){
        //                 if(minute-parseInt(entity.duihuanmainlist[7])<=5){
        //                     dialog(i18n.t('dialogs.system', {lng: entity.lang}),i18n.t('dialogs.dhm_success_exp', {lng: entity.lang, exp: (parseInt(entity.duihuanmainlist[3])-99)/4}),entity);
        //                     entity.exp+=(parseInt(entity.duihuanmainlist[3])-99)/4;
        //                     entity.used_duihuanma.push(entity.duihuanma);
        //                     savePlayer(entity);
        //                 }
        //                 else{
        //                     dialog(i18n.t('dialogs.error', {lng: entity.lang}),i18n.t('dialogs.dhm_expired', {lng: entity.lang}),entity)
        //                 }
        //             }
        //             else{
        //                 dialog(i18n.t('dialogs.error', {lng: entity.lang}),i18n.t('dialogs.dhm_not_exist', {lng: entity.lang}),entity)
        //             }
        //         }
        //         else{
        //             dialog(i18n.t('dialogs.error', {lng: entity.lang}),i18n.t('dialogs.dhm_not_exist', {lng: entity.lang}),entity)
        //         }
        //     }
        // }
        if(entity.duihuanma=='苦力怕'){
            dialog(i18n.t('dialogs.system', {lng: entity.lang}),i18n.t('dialogs.dhm_success_creeper', {lng: entity.lang}),entity)
            if(entity.skins.includes('苦力怕')==false){
                entity.skins.push('苦力怕');
            }
            entity.used_duihuanma.push(entity.duihuanma);
            savePlayer(entity)
        }
        else if(entity.duihuanma=='史蒂夫'){
            dialog(i18n.t('dialogs.system', {lng: entity.lang}),i18n.t('dialogs.dhm_success_steve', {lng: entity.lang}),entity)
            if(entity.skins.includes('史蒂夫')==false){
                entity.skins.push('史蒂夫');
            }
            entity.used_duihuanma.push(entity.duihuanma);
            savePlayer(entity)
        }
        else if(entity.duihuanma=='新图限时福利'){
            dialog(i18n.t('dialogs.system', {lng: entity.lang}),i18n.t('dialogs.dhm_success_exp', {lng: entity.lang, exp: 100}),entity)
            entity.exp+=100 
            entity.used_duihuanma.push(entity.duihuanma);
            savePlayer(entity)
        }
        // else if(entity.duihuanma=='旧版福利'){
        //     dialog(i18n.t('dialogs.system', {lng: entity.lang}),i18n.t('dialogs.dhm_success_exp', {lng: entity.lang, exp: 1000}),entity)
        //     entity.exp+=1000
        //     entity.used_duihuanma.push(entity.duihuanma);
        //     savePlayer(entity)
        // }
        // else if(entity.duihuanma=='壹周年'){
        //     dialog(i18n.t('dialogs.system', {lng: entity.lang}),i18n.t('dialogs.dhm_success_exp', {lng: entity.lang, exp: 3650}),entity)
        //     entity.exp+=3650
        //     entity.used_duihuanma.push(entity.duihuanma);
        //     savePlayer(entity)
        // }
        // else if(entity.duihuanma=='记忆碎片1'){
        //     dialog(i18n.t('dialogs.system', {lng: entity.lang}),i18n.t('dialogs.dhm_success_exp', {lng: entity.lang, exp: 100}),entity)
        //     entity.exp+=100
        //     entity.used_duihuanma.push(entity.duihuanma);
        //     savePlayer(entity)
        // }
        else{
            dialog(i18n.t('dialogs.error', {lng: entity.lang}),i18n.t('dialogs.dhm_not_exist', {lng: entity.lang}),entity)     
        }
    }
    catch(e){
        return
    }
}
// 数据库
var Storage = storage.getGroupStorage('cundang'); // 获取数据库，名称为 cundang

const CorrespondingName = { // 在此添加排行榜对应的单位和名称（无名称 则表示不显示名称）
    'exp': [i18n.t('leaderboard.exp_unit'), '无名称'],
    'fastest_time': ['', '无名称'],
};

const unsavedData = { // 玩家初始无需保存的数据，可增添或删除
    victory: false,
    cankick: true,
};

const savedData = { // 玩家初始需要保存的数据，可增添或删除
    exp: 50,
    bag: [],
    greenlzxg: false,
    player_title: '玩家',
    x: 3,
    y: 4,
    z: 4,
    leave_x: 3,
    leave_y: 4,
    leave_z: 4,
    adminlevel: 0,
    canplay: true,
    used_duihuanma: [],
    skins: ['原版皮肤'],
    usingskin: '原版',
    last_team: 0,
    jointime: {
        year: 2025,
        month: 7,
        day: 19,
        hour: 0,
        minute: -10086
    },
    dimension: 1,//1:黑 2:白
    cundang_dimension: 1,//1:黑 2:白
    time: 0,
    fastest_time: 0, // 最快通关时间
    lang: undefined,
};

/**
 * 初始化玩家数据
 * 
 * @param {GameEntity} entity
 */
function initPlayer(entity:GamePlayerEntity) { // 初始化玩家数据
    Object.assign(entity, savedData);
    Object.assign(entity, unsavedData);
};

/**
 * 获取玩家数据
 * 
 * @param {GameEntity} entity
 */
/**
 * 获取玩家数据
 * 
 * @param {GamePlayerEntity} entity - 玩家实体
 * @returns {Object} 包含玩家数据的对象
 */
function getPlayerData(entity: GamePlayerEntity): Record<string, any> {
    const data: Record<string, any> = { 'name': entity.player.name };
    
    for (const key in savedData) {
        if (Object.prototype.hasOwnProperty.call(savedData, key)) {
            if (Object.prototype.hasOwnProperty.call(entity, key)) {
                data[key] = (entity as any)[key];
            }
        }
    }
    
    return data;
}

/**
 * 存档
 * 
 * @param {GameEntity} entity
 */
async function savePlayer(entity:GamePlayerEntity) { // 存档
    if(entity.victory==false){
        entity.leave_x = entity.position.x;
        entity.leave_y = entity.position.y;
        entity.leave_z = entity.position.z;
    }
    await Storage.update(entity.player.userId, () => {  // 更新玩家数据存档
        return getPlayerData(entity);
    });
};

/**
 * 删档
 * 
 * @param {GameEntity} entity
 */
async function deletePlayer(entity:GamePlayerEntity) { // 删档
    entity.save = false
    await Storage.remove(entity.player.userId); // 删除玩家数据存档
};
async function deletePlayerByUserid(userid:string) { // 通过userid删档
    await Storage.remove(userid); // 删除玩家数据存档
};

/**
 * 读档
 * 
 * @param {GameEntity} entity
 */
async function loadPlayer(entity:GamePlayerEntity) { // 读档
    initPlayer(entity);
    var data = await Storage.get(entity.player.userId); // 获取数据
    if (data) { // 如果数据存在
        Object.assign(entity, data.value);
        entity.player.directMessage(i18n.t('directmsgs.data_loaded', { lng: entity.lang }));
    } else { // 如果数据不存在
        await Storage.set(entity.player.userId, getPlayerData(entity));
        entity.player.directMessage(i18n.t('directmsgs.data_created', { lng: entity.lang }));
        const date = new Date(Date.now());
        const year = date.getFullYear()
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes();
        entity.jointime={
            year: year,
            month: month,
            day: day,
            hour: hour,
            minute: minute
        }
    };
    if(entity.lang==undefined){
        let lang = await entity.player.dialog({
            type: GameDialogType.SELECT,
            title: i18n.t('language.select_title', { lng: 'zh-CN' }),
            content: i18n.t('language.select_content', { lng: 'zh-CN' }),
            options: [i18n.t('language.chinese', { lng: 'zh-CN' }), i18n.t('language.english', { lng: 'zh-CN' })]
        });
        if(!lang || lang.value === null){ 
            entity.lang = 'zh-CN'
            entity.player.directMessage(i18n.t('language.default_selected', { lng: 'zh-CN' }))
        }
        else if(lang.value==i18n.t('language.chinese', { lng: 'zh-CN' })){
            entity.lang = 'zh-CN'
            entity.player.directMessage(i18n.t('language.chinese_selected', { lng: 'zh-CN' }))
        }
        else if(lang.value==i18n.t('language.english', { lng: 'zh-CN' })){
            entity.lang = 'en'
            entity.player.directMessage(i18n.t('language.english_selected', { lng: 'en' }))
        }
    }
};

/**
 * 清档
 */
async function deleteAllData() { // 清档
    var sqlDataList = await Storage.list({ // 将数据库内的所有数据分页
        cursor: 0
    });
    world.querySelectorAll('player').forEach(x => x.save = false);
    try {
        while (true) {
            for (let sqlData of sqlDataList.getCurrentPage()) { // 遍历获取数据
                await Storage.remove(sqlData?.key as string)
            }
            if (sqlDataList.isLastPage) break; // 如果已经是最后一页，退出循环
            await sqlDataList.nextPage(); // 下一页
        };
    } catch (e) {}
};
interface PlayerData {
    name: string;
    [key: string]: any; // 允许其他动态属性
}
/**
 * 显示排行榜
 * 
 * @param {string} type
 */

async function leaderBoard(type:string) { // 排行榜
    var list: any[] = [];
    var sqlDataList = await Storage.list({ // 将数据库内的所有数据分页
        cursor: 0
    });
    while (true) {
        for (let sqlData of sqlDataList.getCurrentPage()) { // 遍历获取数据
            const playerData = sqlData?.value as PlayerData;
            if (!list.some(item => item[0] === playerData.name && item[1] === playerData[type])) {
                list.push([playerData.name, playerData[type]]);
            }
        }
        list = list.sort((a, b) => b[1] - a[1]).slice(0, 100);
        if (sqlDataList.isLastPage) break; // 如果已经是最后一页，退出循环
        await sqlDataList.nextPage(); // 下一页
    };
    const key = type as keyof typeof CorrespondingName;
    return list.filter(value => value[1] !== undefined).map((value, num) => // 将列表里的所有项依次替换成字符串
        i18n.t('leaderboard.rank_format', { 
            lng: 'zh-CN',
            rank: num + 1, 
            name: value[0], 
            value: value[1], 
            unit: CorrespondingName[key][0],
            name_display: CorrespondingName[key][1] !== '无名称' ? CorrespondingName[key][1] : ''
        })
).join('\n');
};

world.onPlayerJoin(async({ entity }) => {
    await loadPlayer(entity); // 载入玩家数据
    log(i18n.t('logs.join', { lng: entity.lang }),entity)
    dialog_with_button(entity, i18n.t('dialogs.welcome', {lng: entity.lang}),i18n.t('dialogs.joinwelcome', {lng: entity.lang, name: entity.player.name }),[i18n.t('tutorial.know', { lng: entity.lang })])
    if(entity.fastest_time==undefined){
        entity.fastest_time = 0; // 如果没有最快通关时间，则设置为0
    }
    if(entity.canplay==false){
        entity.player.cancelDialogs()
        dialog(i18n.t('dialogs.ban', {lng:entity.lang}),i18n.t('dialogs.baninfo', {lng:entity.lang}),entity)
        await sleep(10000)
        entity.player.kick()
        return
    }
    if(entity.player_title=='玩家'&&entity.adminlevel==1){
        entity.player_title='管理员'
    }else if(entity.player_title=='玩家'&&entity.adminlevel==2){
        entity.player_title='高级管理员'
    }
    if(entity.player_title=='管理员'&&entity.adminlevel!=1&&!admin.includes(entity.player.name)){
        entity.player_title='玩家'
    }
    else if(entity.player_title=='高级管理员'&&entity.adminlevel<=2&&!adminpro.includes(entity.player.name)){
        entity.player_title='玩家'
    }
    if(entity.adminlevel>=2||adminpro.includes(entity.player.name)){
        remoteChannel.sendClientEvent(entity, {type:'command',args:'opencmd'})
    }
    world.say(i18n.t('chat.welcome_join', { 
        lng: entity.lang,
        title: entity.player_title=='玩家'?' ':i18n.t('chat.title_prefix', {lng: entity.lang, title: entity.player_title}),
        name: entity.player.name,
        online_count: world.querySelectorAll('player').length
    }))
    entity.position.set(entity.leave_x,entity.leave_y,entity.leave_z)
    entity.player.spawnPoint.set(entity.x,entity.y,entity.z)
    remoteChannel.sendClientEvent(entity, { type: 'basicinfo', args: [entity.player.name, entity.player_title, entity.player.avatar] });
});
world.onPlayerLeave(async({ entity }) => {
    await savePlayer(entity); // 保存玩家数据
});

// 右键菜单&左键切换维度
world.onPress(async({button,entity})=>{
    if(button==='action1'){
        const result = await entity.player.dialog({
            type: GameDialogType.SELECT,
            title: i18n.t('dialogs.menu.menu', {lng: entity.lang}),
            content: i18n.t('dialogs.menu.basicinfo', {lng: entity.lang, exp:entity.exp, time:entity.time, hp: entity.hp, maxhp: entity.maxHp, position: entity.position}),
            options:[i18n.t('menu_options.language', {lng: entity.lang}),
                i18n.t('dialogs.menu.redemption_code', {lng: entity.lang}),
                i18n.t('dialogs.menu.data', {lng: entity.lang}),
                i18n.t('dialogs.menu.leaderboard.exp', {lng: entity.lang}),
                i18n.t('dialogs.menu.leaderboard.time', {lng: entity.lang}),
                i18n.t('dialogs.menu.gameui', {lng: entity.lang}),
                i18n.t('dialogs.menu.skin', {lng: entity.lang}),
                i18n.t('menu_options.shop', {lng: entity.lang}),
                i18n.t('menu_options.backpack', {lng: entity.lang}),
                i18n.t('menu_options.restart', {lng: entity.lang}),
                i18n.t('menu_options.uncrouch', {lng: entity.lang}),
                i18n.t('menu_options.switch_view', {lng: entity.lang}),
                i18n.t('menu_options.bug_report', {lng: entity.lang}),
                i18n.t('menu_options.mute_chat', {lng: entity.lang}),
                i18n.t('menu_options.donate', {lng: entity.lang}),
                i18n.t('menu_options.admin_tools', {lng: entity.lang})]
        });
        if(!result || result.value === null){ 
            return; 
        }
        else if(result.value==i18n.t('menu_options.language', {lng: entity.lang})){
            const result = await entity.player.dialog({
                type: GameDialogType.SELECT,
                title: i18n.t('language.select_title', {lng: entity.lang}),
                content: i18n.t('language.select_content', {lng: entity.lang}),
                options: [i18n.t('language.chinese', {lng: entity.lang}), i18n.t('language.english', {lng: entity.lang})]
            });
            if(!result || result.value === null){ 
                return; 
            }
            else if(result.value==i18n.t('language.chinese', {lng: entity.lang})){
                entity.lang = 'zh-CN'
                entity.player.directMessage(i18n.t('language.chinese_selected', {lng: entity.lang}))
            }
            else if(result.value==i18n.t('language.english', {lng: entity.lang})){
                entity.lang = 'en'
                entity.player.directMessage(i18n.t('language.english_selected', {lng: entity.lang}))
            }
        }
        else if(result.value==i18n.t('menu_options.donate', {lng: entity.lang})){
            entity.player.link(`https://afdian.com/a/azkbbys`, {isConfirm: false, isNewTab: true})
        }
        else if(result.value=='选择附图'){
            entity.position.set(97,40,74);
            dialog(i18n.t('dialogs.system', {lng: entity.lang}),i18n.t('dialogs.attachment_select_info', {lng: entity.lang}),entity)
        }
        // else if(result.value=='��音乐��'){
        //     const result = await entity.player.dialog({
        //         type: GameDialogType.SELECT,
        //         title: '��音乐选择��',
        //         content:`这里是有关sql的功能，请选择：`,
        //         options:['❌关闭所有声音','花之舞','夜、萤火虫和你']
        //     });
        //     if(!result || result.value === null){ 
        //         return;
        //     }
        //     else if(result.value=='❌关闭所有声音'){
        //         entity.player.sound
        //     }
        //     else if(result.value=='花之舞'){
        //         entity.player.sound('audio/夜、萤火虫和你.mp3')
        //     }
        //     else if(result.value=='夜、萤火虫和你'){
        //         entity.player.sound('audio/夜、萤火虫和你.mp3')
        //     }
        // }
        else if(result.value==i18n.t('dialogs.menu.gameui', {lng: entity.lang})){
            const result = await entity.player.dialog({
                type: GameDialogType.SELECT,
                title: 'gameUi',
                content:i18n.t('dialogs.gameui.content', {lng: entity.lang}),
                options:[i18n.t('dialogs.gameui.cancel', {lng: entity.lang}), i18n.t('dialogs.gameui.close', {lng: entity.lang}), i18n.t('dialogs.gameui.open', {lng: entity.lang}), i18n.t('dialogs.gameui.refresh', {lng: entity.lang})]
            });
            if(!result || result.value === null){ 
                return; 
            }
            else if(result.value==i18n.t('dialogs.gameui.close', {lng: entity.lang})){
                remoteChannel.sendClientEvent(entity, {type:'command',args:'close'})
                entity.player.directMessage(i18n.t('directmsgs.closed', {lng: entity.lang}))
            }
            else if(result.value==i18n.t('dialogs.gameui.open', {lng: entity.lang})){
                remoteChannel.sendClientEvent(entity, {
                    type:'command',
                    args:'open'
                })
                remoteChannel.sendClientEvent(entity, {
                    type:'玩家信息1',
                    args:{
                        avatar:entity.player.avatar,
                        name:entity.player.name,
                        player_title:entity.player_title
                    }
                })
                entity.player.directMessage(i18n.t('directmsgs.opened', {lng: entity.lang}))
            }
            else if(result.value==i18n.t('dialogs.gameui.refresh', {lng: entity.lang})){
                remoteChannel.sendClientEvent(entity, {
                    type: '刷新大小',
                    args: null
                })
                entity.player.directMessage(i18n.t('directmsgs.refresh_not_supported', {lng: entity.lang}))
            }
        }
        else if(result.value==i18n.t('dialogs.menu.redemption_code', {lng: entity.lang})){
            entity.duihuanma = await entity.player.dialog({
                type: GameDialogType.INPUT,
                title: i18n.t('dialogs.redemption.title', {lng: entity.lang}),
                content: i18n.t('dialogs.redemption.content', {lng: entity.lang}),
                confirmText: i18n.t('dialogs.confirm', {lng: entity.lang}),
            })as string;
            if(!entity.duihuanma || entity.duihuanma === null){ 
                entity.player.link(`http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=Atg_SCPUyp2d8yAAxjaozzjFH3eu198J&authKey=ohyqS%2FYbJ%2F3C%2BkzrFVQSS7wJoeifKFxeo8SNr4KsX7fey6sx%2Fy%2FX7JEF%2Bvtkryd1&noverify=0&group_code=763919859`, {isConfirm: false, isNewTab: true})
            }
            else{
                use_duihuanma(entity)
            }
        }
        else if(result.value==i18n.t('dialogs.menu.data', {lng: entity.lang})){
            const result = await entity.player.dialog({
                type: GameDialogType.SELECT,
                title: i18n.t('dialogs.storage.title', {lng: entity.lang}),
                content:i18n.t('dialogs.storage.content', {lng: entity.lang}),
                options:[i18n.t('dialogs.storage.save', {lng: entity.lang}), i18n.t('dialogs.storage.delete', {lng: entity.lang})]
            });
            if(!result || result.value === null){ 
                return; 
            }
            else if(result.value==i18n.t('dialogs.storage.save', {lng: entity.lang})){
                savePlayer(entity);
                dialog(i18n.t('dialogs.system', {lng: entity.lang}),i18n.t('dialogs.storage.save_success', {lng: entity.lang}),entity)
            }
            else if(result.value==i18n.t('dialogs.storage.delete', {lng: entity.lang})){
                const result = await entity.player.dialog({
                    type: GameDialogType.SELECT,
                    title: i18n.t('dialogs.storage.delete_confirm_title', {lng: entity.lang}),
                    content:i18n.t('dialogs.storage.delete_confirm_content', {lng: entity.lang}),
                    options:[i18n.t('dialogs.storage.delete_cancel1', {lng: entity.lang}), i18n.t('dialogs.storage.delete_cancel2', {lng: entity.lang}), i18n.t('dialogs.storage.delete_cancel3', {lng: entity.lang}), i18n.t('dialogs.storage.delete_cancel4', {lng: entity.lang}), i18n.t('dialogs.storage.delete_confirm', {lng: entity.lang})]
                });
                if(result?.value==i18n.t('dialogs.storage.delete_confirm', {lng: entity.lang})){
                    Object.assign(entity, savedData);
                    savePlayer(entity);
                    entity.player.kick();
                }
            }
        }
        else if(result.value==i18n.t('dialogs.menu.leaderboard.exp', {lng: entity.lang})){
            await entity.player.dialog({
                type: GameDialogType.SELECT,
                title: i18n.t('leaderboard.title', {lng: entity.lang}),
                content: await leaderBoard('exp'),
                options: [i18n.t('dialogs.confirm', {lng: entity.lang})]
            });
        }
        else if(result.value==i18n.t('dialogs.menu.leaderboard.time', {lng: entity.lang})){
            await dialog_with_button(entity, i18n.t('leaderboard.title', {lng: entity.lang}), i18n.t('leaderboard.time_note', {lng: entity.lang}), [i18n.t('dialogs.acknowledge', {lng: entity.lang})])
            await entity.player.dialog({
                type: GameDialogType.SELECT,
                title: i18n.t('leaderboard.title', {lng: entity.lang}),
                content: await leaderBoard('fastest_time'),
                options: [i18n.t('dialogs.confirm', {lng: entity.lang})]
            });
        }
        else if(result.value==i18n.t('dialogs.menu.skin', {lng: entity.lang})){
            const result = await entity.player.dialog({
                type: GameDialogType.SELECT,
                title: i18n.t('dialogs.skin.title', {lng: entity.lang}),
                content:i18n.t('dialogs.skin.content', {lng: entity.lang}),
                options:entity.skins
            });
            if(!result || result.value === null){ 
                entity.player.resetToDefaultSkin()
                entity.usingskin = '原版'
            }
            else if(result.value!='原版皮肤'){
                entity.usingskin = result.value;
                entity.player.setSkinByName(result.value)
            }
            else{
                entity.player.resetToDefaultSkin()
                entity.usingskin = '原版'
            }
            savePlayer(entity)
            entity.player.directMessage(i18n.t('directmsgs.switch_success', {lng: entity.lang}))
        }
        else if(result.value==i18n.t('menu_options.shop', {lng: entity.lang})){
            const result = await entity.player.dialog({
                type: GameDialogType.SELECT,
                title: i18n.t('dialogs.shop.title', {lng: entity.lang}),
                content:i18n.t('dialogs.shop.content', {lng: entity.lang, exp: entity.exp}),
                options:[i18n.t('dialogs.exit', {lng: entity.lang}),
                i18n.t('dialogs.shop.green_particle', {lng: entity.lang}),
                i18n.t('dialogs.shop.creeper_skin', {lng: entity.lang}),
                i18n.t('dialogs.shop.steve_skin', {lng: entity.lang}),
                i18n.t('dialogs.shop.fly_privilege', {lng: entity.lang}),
                i18n.t('dialogs.shop.fly_speed', {lng: entity.lang}),
                i18n.t('dialogs.shop.shrink_potion', {lng: entity.lang}),
                i18n.t('dialogs.shop.restore_potion', {lng: entity.lang}),
                i18n.t('dialogs.shop.enlarge_potion', {lng: entity.lang})]
            });
            if(!result || result.value === null){ 
                return; 
            }
            else if(result.value==i18n.t('dialogs.shop.green_particle', {lng: entity.lang})){
                if(entity.exp>=150){
                    entity.exp-=150;
                    entity.greenlzxg=true;
                    savePlayer(entity);
                    entity.player.directMessage(i18n.t('directmsgs.purchase_success_particle', {lng: entity.lang}))
                }
                else{
                    dialog(i18n.t('dialogs.error', {lng: entity.lang}),i18n.t('dialogs.shop.not_enough_exp', {lng: entity.lang}),entity)
                }
            }
            else if(result.value==i18n.t('dialogs.shop.creeper_skin', {lng: entity.lang})){
                if(entity.exp>=500&&entity.skins.includes('苦力怕')==false){
                    entity.exp-=500;
                    entity.skins.push('苦力怕')
                    savePlayer(entity);
                    entity.player.directMessage(i18n.t('directmsgs.purchase_success_skin', {lng: entity.lang}))
                }
                else{
                    dialog(i18n.t('dialogs.error', {lng: entity.lang}),i18n.t('dialogs.shop.not_enough_exp_or_owned', {lng: entity.lang}),entity)
                }
            }
            else if(result.value==i18n.t('dialogs.shop.steve_skin', {lng: entity.lang})){
                if(entity.exp>=500&&entity.skins.includes('史蒂夫')==false){
                    entity.exp-=500;
                    entity.skins.push('史蒂夫')
                    savePlayer(entity);
                    entity.player.directMessage(i18n.t('directmsgs.purchase_success_skin', {lng: entity.lang}))
                }
                else{
                    dialog(i18n.t('dialogs.error', {lng: entity.lang}),i18n.t('dialogs.shop.not_enough_exp_or_owned', {lng: entity.lang}),entity)
                }
            }
            else if(result.value==i18n.t('dialogs.shop.fly_privilege', {lng: entity.lang})){
                if(entity.exp>=70){
                    entity.exp-=70;
                    entity.bag.push(i18n.t('items.fly_privilege', {lng: entity.lang}))
                    savePlayer(entity);
                    entity.player.directMessage(i18n.t('directmsgs.purchase_success_backpack', {lng: entity.lang}))
                }
                else{
                    dialog(i18n.t('dialogs.error', {lng: entity.lang}),i18n.t('dialogs.shop.not_enough_exp', {lng: entity.lang}),entity)
                }
            }
            else if(result.value==i18n.t('dialogs.shop.fly_speed', {lng: entity.lang})){
                if(entity.exp>=5){
                    entity.exp-=5;
                    entity.bag.push(i18n.t('items.fly_speed', {lng: entity.lang}))
                    savePlayer(entity);
                    entity.player.directMessage(i18n.t('directmsgs.purchase_success_backpack', {lng: entity.lang}))
                }
                else{
                    dialog(i18n.t('dialogs.error', {lng: entity.lang}),i18n.t('dialogs.shop.not_enough_exp', {lng: entity.lang}),entity)
                }
            }
            else if(result.value==i18n.t('dialogs.shop.shrink_potion', {lng: entity.lang})){
                if(entity.exp>=70){
                    entity.exp-=70;
                    entity.bag.push(i18n.t('items.shrink_potion', {lng: entity.lang}))
                    savePlayer(entity);
                    entity.player.directMessage(i18n.t('directmsgs.purchase_success_backpack', {lng: entity.lang}))
                }
                else{
                    dialog(i18n.t('dialogs.error', {lng: entity.lang}),i18n.t('dialogs.shop.not_enough_exp', {lng: entity.lang}),entity)
                }
            }
            else if(result.value==i18n.t('dialogs.shop.restore_potion', {lng: entity.lang})){
                if(entity.exp>=1){
                    entity.exp-=1;
                    entity.bag.push(i18n.t('items.restore_potion', {lng: entity.lang}))
                    savePlayer(entity);
                    entity.player.directMessage(i18n.t('directmsgs.purchase_success_backpack', {lng: entity.lang}))
                }
                else{
                    dialog(i18n.t('dialogs.error', {lng: entity.lang}),i18n.t('dialogs.shop.not_enough_exp', {lng: entity.lang}),entity)
                }
            }
            else if(result.value==i18n.t('dialogs.shop.enlarge_potion', {lng: entity.lang})){
                if(entity.exp>=70){
                    entity.exp-=70;
                    entity.bag.push(i18n.t('items.enlarge_potion', {lng: entity.lang}))
                    savePlayer(entity);
                    entity.player.directMessage(i18n.t('directmsgs.purchase_success_backpack', {lng: entity.lang}))
                }
                else{
                    dialog(i18n.t('dialogs.error', {lng: entity.lang}),i18n.t('dialogs.shop.not_enough_exp', {lng: entity.lang}),entity)
                }
            }
        }
        else if(result.value==i18n.t('menu_options.backpack', {lng: entity.lang})){
            const result = await entity.player.dialog({
                type: GameDialogType.SELECT,
                title: i18n.t('dialogs.backpack.title', {lng: entity.lang}),
                content:i18n.t('dialogs.backpack.content', {lng: entity.lang}),
                options:entity.bag
            });
            if(!result || result.value === null){ 
                return; 
            }
            else if(result.value==i18n.t('items.fly_privilege', {lng: entity.lang})){
                entity.player.canFly=true;
                let index = entity.bag.indexOf(i18n.t('items.fly_privilege', {lng: entity.lang}));
                if (index !== -1) {
                    entity.bag.splice(index, 1);
                }
                savePlayer(entity)
                entity.player.canFly=true;
                entity.player.directMessage(i18n.t('directmsgs.fly_privilege_used', {lng: entity.lang}));
                await sleep(2000);
                entity.player.canFly=false;
            }
            else if(result.value==i18n.t('items.fly_speed', {lng: entity.lang})){
                let index = entity.bag.indexOf(i18n.t('items.fly_speed', {lng: entity.lang}));
                if (index !== -1) {
                    entity.bag.splice(index, 1);
                }
                const flyspeed:string = await entity.player.dialog({
                    type: GameDialogType.INPUT,
                    title: i18n.t('dialogs.fly_speed.title', {lng: entity.lang}),
                    content: i18n.t('dialogs.fly_speed.content', {lng: entity.lang}),
                    confirmText: i18n.t('dialogs.confirm', {lng: entity.lang}),
                })as string;
                entity.player.flySpeed=parseInt(flyspeed)
                savePlayer(entity)
                entity.player.directMessage(i18n.t('directmsgs.fly_speed_used', {lng: entity.lang}))
            }
            else if(result.value==i18n.t('items.shrink_potion', {lng: entity.lang})){
                let index = entity.bag.indexOf(i18n.t('items.shrink_potion', {lng: entity.lang}));
                if (index !== -1) {
                    entity.bag.splice(index, 1);
                }
                entity.player.scale=0.5
                savePlayer(entity)
                entity.player.directMessage(i18n.t('directmsgs.potion_used', {lng: entity.lang}))
            }
            else if(result.value==i18n.t('items.restore_potion', {lng: entity.lang})){
                let index = entity.bag.indexOf(i18n.t('items.restore_potion', {lng: entity.lang}));
                if (index !== -1) {
                    entity.bag.splice(index, 1);
                }
                entity.player.scale=1
                savePlayer(entity)
                entity.player.directMessage(i18n.t('directmsgs.potion_used', {lng: entity.lang}))
            }
            else if(result.value==i18n.t('items.enlarge_potion', {lng: entity.lang})){
                let index = entity.bag.indexOf(i18n.t('items.enlarge_potion', {lng: entity.lang}));
                if (index !== -1) {
                    entity.bag.splice(index, 1);
                }
                entity.player.scale=1.5
                savePlayer(entity)
                entity.player.directMessage(i18n.t('directmsgs.potion_used', {lng: entity.lang}))
            }
            else if(result.value==i18n.t('items.infinite_fly', {lng: entity.lang})){
                entity.player.canFly=true;
                entity.player.directMessage(i18n.t('directmsgs.infinite_fly_used', {lng: entity.lang}))
            }
        }
        else if(result.value==i18n.t('menu_options.restart', {lng: entity.lang})){
            if(entity.canplay==false){
                dialog(i18n.t('dialogs.system', {lng: entity.lang}),i18n.t('dialogs.restart_banned', {lng: entity.lang}),entity)
            }
            else{
                entity.player.spectator=false;
                entity.player.directMessage(i18n.t('directmsgs.restart_success', {lng: entity.lang}))
                entity.victory = false
                entity.player.canFly=false
                entity.time = 0
                entity.hp=100
                entity.player.color = new GameRGBColor(1,1,1)
                entity.position.set(savedData.x,savedData.y,savedData.z)
                savePlayer(entity);
                // entity.ingjf=false;
            }
        }
        else if(result.value==i18n.t('menu_options.uncrouch', {lng: entity.lang})){
            if(entity.canplay==false){
                dialog(i18n.t('dialogs.system', {lng: entity.lang}),i18n.t('dialogs.uncrouch_banned', {lng: entity.lang}),entity)
            }
            else{
                entity.player.forceRespawn()
                // entity.ingjf=false;
                entity.player.directMessage(i18n.t('directmsgs.uncrouch_success', {lng: entity.lang}))
            }
        }
        // else if(result.value=='进入/离开挂机房'){
        //     if(entity.canplay==false){
        //         dialog(i18n.t('dialogs.system', {lng: entity.lang}),i18n.t('dialogs.restart_banned', {lng: entity.lang}),entity)
        //     }
        //     else{
        //         if(entity.ingjf==true){
        //             entity.player.forceRespawn();
        //             entity.ingjf=false;
        //         }
        //         else{
        //             entity.position.set(97,6,74);
        //             entity.ingjf=true;
        //         }
        //     }
        // }
        // else if(result.value=='进入/退出俯视全图'){
        //     if(entity.fsqting==false){
        //         const fsqt = world.querySelector('#俯视全图')
        //         entity.player.cameraEntity=fsqt
        //         entity.player.directMessage(i18n.t('directmsgs.fly_enabled', {lng: entity.lang}))
        //         entity.fsqting=true
        //     }
        //     else{
        //         entity.player.cameraEntity=entity
        //         entity.fsqting=false
        //     }
        // }
        else if(result.value==i18n.t('menu_options.switch_view', {lng: entity.lang})){
            if (entity.player.cameraMode === GameCameraMode.FOLLOW) {
                entity.player.cameraMode = GameCameraMode.FPS
                entity.player.directMessage(i18n.t('directmsgs.switch_success', {lng: entity.lang}))
            }
            else {
                entity.player.cameraMode = GameCameraMode.FOLLOW
                entity.player.directMessage(i18n.t('directmsgs.switch_success', {lng: entity.lang}))
            }
        }
        else if(result.value==i18n.t('menu_options.bug_report', {lng: entity.lang})){
            dialog(i18n.t('dialogs.author', {lng: entity.lang}),i18n.t('dialogs.bug_report', {lng: entity.lang}),entity)
        }
        else if(result.value==i18n.t('menu_options.mute_chat', {lng: entity.lang})){
            const result = await entity.player.dialog({
                type: GameDialogType.INPUT,
                title: i18n.t('dialogs.mute_chat.title', {lng: entity.lang}),
                content: i18n.t('dialogs.mute_chat.content', {lng: entity.lang}),
                confirmText: i18n.t('dialogs.mute_chat.warning', {lng: entity.lang}),
            });
            if(!result || result === null){
                return; 
            }
            else {
                world.say(entity.player.name+'：'+result)
            }
        }
        else if(result.value==i18n.t('menu_options.admin_tools', {lng: entity.lang})){
            if(admin.includes(entity.player.name)||entity.adminlevel>0||adminpro.includes(entity.player.name)){
                const result = await entity.player.dialog({
                    type: GameDialogType.SELECT,
                    title: i18n.t('dialogs.admin_tools.title', {lng: entity.lang}),
                    content: i18n.t('dialogs.admin_tools.content', {lng: entity.lang}),
                    options:[i18n.t('dialogs.admin_tools.doc', {lng: entity.lang}),
                    i18n.t('dialogs.admin_tools.view_logs', {lng: entity.lang}),
                    i18n.t('dialogs.admin_tools.create_chat', {lng: entity.lang}),
                    i18n.t('dialogs.admin_tools.destroy_chat', {lng: entity.lang}),
                    i18n.t('dialogs.admin_tools.fly', {lng: entity.lang}),
                    i18n.t('dialogs.admin_tools.land', {lng: entity.lang}),
                    i18n.t('dialogs.admin_tools.noclip', {lng: entity.lang}),
                    /*i18n.t('dialogs.admin_tools.switch_bgm', {lng: entity.lang}),*/
                    i18n.t('dialogs.admin_tools.teleport_player', {lng: entity.lang}),
                    i18n.t('dialogs.admin_tools.teleport_to_player', {lng: entity.lang}),
                    i18n.t('dialogs.admin_tools.timer', {lng: entity.lang}),
                    i18n.t('dialogs.admin_tools.broadcast', {lng: entity.lang})]
                });
                if(!result || result.value === null){ 
                    return; 
                }
                else if(result.value==i18n.t('dialogs.admin_tools.doc', {lng: entity.lang})){
                    entity.player.link(`https://azkbbys.gitbook.io/azkbbys/docs/bysrunpro/bysrunpro-admin-code-tutorial`, {isConfirm: false, isNewTab: true})
                }
                else if(result.value==i18n.t('dialogs.admin_tools.view_logs', {lng: entity.lang})){
                    entity.player.dialog({
                        type: GameDialogType.SELECT,
                        title: i18n.t('dialogs.admin_tools.logs_title', {lng: entity.lang}),
                        content:i18n.t('dialogs.admin_tools.logs_content', {lng: entity.lang, logs: logs.join('\n')}),
                        options:[i18n.t('dialogs.close', {lng: entity.lang})]
                    })
                }
                else if(result.value==i18n.t('dialogs.admin_tools.create_chat', {lng: entity.lang})){
                    const result = await entity.player.dialog({
                        type: GameDialogType.INPUT,
                        title: i18n.t('dialogs.admin_tools.create_chat_title', {lng: entity.lang}),
                        content: i18n.t('dialogs.admin_tools.create_chat_content', {lng: entity.lang}),
                        confirmText: i18n.t('dialogs.confirm', {lng: entity.lang}),
                    });
                    if(!result || result === null){ 
                        return; 
                    }
                    else{
                        entity.player.directMessage(i18n.t('directmsgs.temp_chat_created', {lng: entity.lang, users: result.split(' '), id: await world.createTempChat(result.split(' '))}))
                    }
                }
                else if(result.value==i18n.t('dialogs.admin_tools.destroy_chat', {lng: entity.lang})){
                    const result = await entity.player.dialog({
                        type: GameDialogType.SELECT,
                        title: i18n.t('dialogs.admin_tools.destroy_chat_title', {lng: entity.lang}),
                        content:i18n.t('dialogs.admin_tools.destroy_chat_content', {lng: entity.lang}),
                        options:await world.getTempChats()
                    });
                    if(!result || result.value === null){ 
                        return; 
                    }
                    else{
                        world.destroyTempChat([result.value])
                        entity.player.directMessage(i18n.t('directmsgs.temp_chat_destroyed', {lng: entity.lang, id: result.value}))
                    }
                }
                else if(result.value==i18n.t('dialogs.admin_tools.fly', {lng: entity.lang})){
                    entity.player.canFly=true
                    entity.player.directMessage(i18n.t('directmsgs.fly_enabled', {lng: entity.lang}))
                }
                else if(result.value==i18n.t('dialogs.admin_tools.land', {lng: entity.lang})){
                    entity.player.canFly=false
                    entity.player.directMessage(i18n.t('directmsgs.fly_disabled', {lng: entity.lang}))
                    const allWearables = entity.player.wearables();
                }
                else if(result.value==i18n.t('dialogs.admin_tools.noclip', {lng: entity.lang})){
                    if(entity.player.spectator==false){
                        entity.player.spectator=true
                    }
                    else{
                        entity.player.spectator=false
                    }
                }
                else if(result.value==i18n.t('dialogs.admin_tools.teleport_player', {lng: entity.lang})){
                    const playernamelist : string[] = []
                    world.querySelectorAll('player').forEach((e)=>{
                        if(e.player.name!=entity.player.name)
                        playernamelist.push(e.player.name)
                    })
                    const result = await entity.player.dialog({
                        type: GameDialogType.SELECT,
                        title: i18n.t('dialogs.admin_tools.teleport_player_title', {lng: entity.lang}),
                        content: i18n.t('dialogs.admin_tools.teleport_player_content', {lng: entity.lang}),
                        options:playernamelist
                    });
                    if(!result || result.value === null){ 
                        return; 
                    }
                    else{
                        for (const e of world.querySelectorAll('player')){;
                            if(e.player.name==result.value){;
                                e.position.x=entity.position.x
                                e.position.y=entity.position.y
                                e.position.z=entity.position.z
                                entity.player.directMessage(i18n.t('directmsgs.teleport_success', {lng: entity.lang}))
                            };
                        };
                    }
                }
                else if(result.value==i18n.t('dialogs.admin_tools.teleport_to_player', {lng: entity.lang})){
                    const playernamelist : string[] = []
                    world.querySelectorAll('player').forEach((e)=>{
                        if(e.player.name!=entity.player.name)
                        playernamelist.push(e.player.name)
                    })
                    const result = await entity.player.dialog({
                        type: GameDialogType.SELECT,
                        title: i18n.t('dialogs.admin_tools.teleport_to_player_title', {lng: entity.lang}),
                        content: i18n.t('dialogs.admin_tools.teleport_to_player_content', {lng: entity.lang}),
                        options:playernamelist
                    });
                    if(!result || result.value === null){ 
                        return; 
                    }
                    else{
                        for (const e of world.querySelectorAll('player')){;
                            if(e.player.name==result.value){;
                                entity.position.x=e.position.x
                                entity.position.y=e.position.y
                                entity.position.z=e.position.z
                                entity.player.directMessage(i18n.t('directmsgs.teleport_success', {lng: entity.lang}))
                            };
                        };
                    }
                }
                else if(result.value==i18n.t('dialogs.admin_tools.timer', {lng: entity.lang})){
                    const result = await entity.player.dialog({
                        type: GameDialogType.INPUT,
                        title: i18n.t('dialogs.admin_tools.timer_title', {lng: entity.lang}),
                        content: i18n.t('dialogs.admin_tools.timer_content', {lng: entity.lang}),
                        confirmText: i18n.t('dialogs.confirm', {lng: entity.lang}),
                    });
                    console.log(entity.count)
                    if(entity.count=true){
                        let s = 0
                        let m = 0
                        let h = 0
                        while(entity.count==true){
                            s++
                            if(s>=60){;m++;s=0}
                            if(m>=60){;h++;m=0}
                            if(h>=3){;entity.player.directMessage(i18n.t('directmsgs.timer_max', {lng: entity.lang}));return;}
                            entity.player.directMessage(h+':'+m+':'+s)
                            await sleep(1000)
                        }
                    }
                    else{
                        entity.player.directMessage(i18n.t('directmsgs.timer_stopped', {lng: entity.lang}))
                    }
                }
                else if(result.value==i18n.t('dialogs.admin_tools.broadcast', {lng: entity.lang})){
                    const result = await entity.player.dialog({
                        type: GameDialogType.INPUT,
                        title: i18n.t('dialogs.admin_tools.broadcast_title', {lng: entity.lang}),
                        content: i18n.t('dialogs.admin_tools.broadcast_content', {lng: entity.lang}),
                        confirmText: i18n.t('dialogs.admin_tools.broadcast_confirm', {lng: entity.lang}),
                    }) as string;
                    world.say(result)
                }
            }
        }
    }
    else if(button=='action0'){
        entity.dimension==1?entity.position.x+=64:entity.position.x-=64
        entity.dimension==1?entity.dimension=2:entity.dimension=1
        entity.player.directMessage(i18n.t('directmsgs.dimension_switched', {lng: entity.lang}))
        // log(i18n.t('logs.dimension_switch', {lng: entity.lang, dimension: entity.dimension==1?i18n.t('dimension.black', {lng: entity.lang}):i18n.t('dimension.white', {lng: entity.lang})}),entity)
    }
})

// 重生和检测
world.onPlayerJoin(({entity})=>{
    world.onTick(({tick})=>{
        if(tick%16==0&&!entity.victory){
            entity.time+=1
        }
        if(voxels.getVoxelId(entity.position.x,entity.position.y-(entity.player.scale==1?2:1),entity.position.z)==170&&entity.victory==false&&entity.player.spectator==false){
            entity.player.forceRespawn()
            entity.player.directMessage(i18n.t('directmsgs.respawn', {lng: entity.lang}))
        }
        if(voxels.getVoxelId(entity.position.x,entity.position.y-(entity.player.scale==1?2:1),entity.position.z)==679&&entity.victory==false&&entity.player.spectator==false){
            entity.velocity.y=1
        }
        check_player(entity)
        if(entity.position.y<=1){
            reborn(entity)
        }
        if(entity.position.x<=64){
            entity.dimension=1
        }
        else{
            entity.dimension=2
        }
        remoteChannel.sendClientEvent(entity, { type: 'tick', args: [entity.dimension==1?i18n.t('dimension.black', {lng: entity.lang}):i18n.t('dimension.white', {lng: entity.lang}),entity.time,lastmsg,entity.adminlevel,entity.exp] });
    })
})
world.onVoxelContact(({ entity, voxel, x, y, z, axis }) => {
    if (!entity.player) return; // 如果碰到方块的不是玩家，则跳过
    if (voxel === 679 && axis.y === 1) {
        entity.velocity.y=1
    }else if(voxel === 667 && axis.y === 1) {
        entity.velocity.y=2
    }
});
world.onFluidEnter(({entity, tick, voxel}) => {
    const voxelName = voxels.name(voxel)
    if (voxelName=='strawberry_juice'){
        entity.player?.forceRespawn()??''
        entity.player?.directMessage(i18n.t('directmsgs.strawberry_juice', {lng: entity.lang}))??''
    }
})

// 管理员代码
world.onChat(({ entity, message }) => {
    if(adminpro.includes(entity.player?.name??'undefined')||entity.adminlevel>1){
        if (message.startsWith('$')) {
            try {
                world.say('<~ ' + eval(message.slice(1)))
            }
            catch (err) {
                world.say('<~ ' + err)
            }
        }
    }
})

// 碰撞过滤
world.addCollisionFilter('player','player')

// 实体交互
const points = world.querySelectorAll('.存档点')
points.forEach((e)=>{
    e.onEntityContact(({other})=>{
        if(!other.player)return;
        const entity = other as GamePlayerEntity
        const spawnPoint = e.position.add(new GameVector3(0, 2.5, 0));
        if(spawnPoint.equals(other.player.spawnPoint))return;
        entity.player.spawnPoint = spawnPoint;
        entity.x=e.position.x;
        entity.y=e.position.y+2.5;
        entity.z=e.position.z;
        entity.cundang_dimension = other.dimension;
        savePlayer(other as GamePlayerEntity);
        entity.player.directMessage(i18n.t('directmsgs.save_success', {lng: entity.lang}));
        if(entity.victory==false){
            entity.exp+=1;
        }
        reminder(entity)
    })
})
const next_points = world.querySelectorAll('.下一关')
next_points.forEach((e)=>{
    e.onEntityContact(({other})=>{
        if(!other.player)return;
        const entity = other as GamePlayerEntity
        entity.player.directMessage(i18n.t('directmsgs.next_level', {lng: entity.lang}))
        entity.position.set(3,entity.position.y,e.position.z+8)
        log(i18n.t('logs.next_level', {lng: entity.lang}),entity)
    })
})
const upstairs = world.querySelectorAll('.上楼')[0]
upstairs.onEntityContact(({other})=>{
    if(!other.player)return;
    const entity = other as GamePlayerEntity
    entity.player.directMessage(i18n.t('directmsgs.next_level', {lng: entity.lang}))
    entity.position.set(3,upstairs.position.y+=44,4)
    log(i18n.t('logs.next_level', {lng: entity.lang}),entity)
})
const retime = world.querySelector('#时间重置') as GameEntity
retime.onEntityContact(({other})=>{
    if(!other.player)return;
    const entity = other as GamePlayerEntity
    entity.time=0
    entity.player.directMessage(i18n.t('directmsgs.timer_start', {lng: entity.lang}))
})
const switch_dimension= world.querySelector('#切换') as GameEntity
switch_dimension.enableInteract=true
switch_dimension.interactHint=''
switch_dimension.interactRadius=100000000
switch_dimension.onInteract(({entity})=>{
    entity.dimension==1?entity.position.x+=64:entity.position.x-=64
    entity.dimension==1?entity.dimension=2:entity.dimension=1
    entity.player.directMessage(i18n.t('directmsgs.dimension_switched', {lng: entity.lang}))
    log(i18n.t('logs.dimension_switch', {lng: entity.lang, dimension: entity.dimension==1?i18n.t('dimension.black', {lng: entity.lang}):i18n.t('dimension.white', {lng: entity.lang})}),entity)
})
const win= world.querySelector('#终点') as GameEntity
// win.enableInteract=true
// win.interactHint='终点'
// win.interactRadius=3
// win.onInteract(({entity})=>{
//     if(entity.victory==true)return
//     world.say(i18n.t('chat.victory', {lng: entity.lang, name: entity.player.name, time: entity.time}))
//     entity.victory = true
//     entity.player.spectator=true
//     entity.player.color = new GameRGBColor(0, 1, 0)
//     entity.exp+=100
//     dialog_with_button(entity, i18n.t('dialogs.congratulations', {lng: entity.lang}), i18n.t('dialogs.victory_message', {lng: entity.lang, time: entity.time}), [i18n.t('dialogs.confirm', {lng: entity.lang})])
//     log(i18n.t('logs.victory', {lng: entity.lang, time: entity.time}))
// })
win.onEntityContact(({other})=>{
    if(!other.player)return;
    let entity = other as GamePlayerEntity
    if(entity.victory==true)return
    if(entity.adminlevel>=1&&entity.time<=350){
        entity.adminlevel=0
        savePlayer(entity)
        dialog_with_button(entity, ``, i18n.t('dialogs.admin_abuse', {lng: entity.lang}), [i18n.t('tutorial.know', {lng: entity.lang})])
        return
    }else if(entity.time<=350){
        entity.player.spawnPoint.set(savedData.x,savedData.y,savedData.z)
        entity.player.forceRespawn()
        dialog_with_button(entity, ``, i18n.t('dialogs.suspicious_time', {lng: entity.lang}), [i18n.t('tutorial.know', {lng: entity.lang})])
        return
    }
    world.say(i18n.t('chat.victory', {lng: entity.lang, name: entity.player.name, time: entity.time}))
    entity.victory = true
    entity.player.spectator=true
    entity.player.color = new GameRGBColor(0, 1, 0)
    entity.exp+=100
    entity.player.spawnPoint.set(savedData.x,savedData.y,savedData.z)
    entity.leave_x=savedData.x
    entity.leave_y=savedData.y
    entity.leave_z=savedData.z
    if(entity.time<10000&&10000-entity.fastest_time>entity.time){
        entity.fastest_time = 10000 - entity.time
    }
    savePlayer(entity)
    dialog_with_button(entity, i18n.t('dialogs.congratulations', {lng: entity.lang}), i18n.t('dialogs.victory_message', {lng: entity.lang, time: entity.time}), [i18n.t('dialogs.confirm', {lng: entity.lang})])
    log(i18n.t('logs.victory', {lng: entity.lang, time: entity.time}),entity)
})
// 粒子效果
const particle_greenCrystal = {
    particleRate: 500,
    particleLifetime: 0.4,
    particleSize: [4, 3, 2, 1, 0.25],
    particleColor: [
        new GameRGBColor(1, 1, 0),
        new GameRGBColor(0, 1, 0),
        new GameRGBColor(0, 1, 0),
        new GameRGBColor(0, 1, 0),
        new GameRGBColor(1, 1, 1)
    ],
}
const test_green = {
    particleRate: 500,
    particleLifetime: 999,
    particleSize: [4, 3, 2, 1, 0.25],
    particleColor: [
        new GameRGBColor(1, 1, 0),
        new GameRGBColor(0, 1, 0),
        new GameRGBColor(0, 1, 0),
        new GameRGBColor(0, 1, 0),
        new GameRGBColor(1, 1, 1)
    ],
}
const particle_purpleCrystal = {
    particleRate: 500,
    particleLifetime: 0.4,
    particleSize: [4, 3, 2, 1, 0.25],
    particleColor: [
        new GameRGBColor(0, 0, 1),
        new GameRGBColor(0, 0, 1),
        new GameRGBColor(1, 0, 1),
        new GameRGBColor(1, 0, 1),
        new GameRGBColor(1, 1, 1)
    ],
}
const wcbl = {
    particleRate: 700,
    particleLifetime: 1.5,
    particleSize: [1.3, 1.3, 1.2, 1.1, 1],
    particleColor: [
        new GameRGBColor(0, 1, 0),
        new GameRGBColor(0, 0, 1),
        new GameRGBColor(1, 0, 1),
        new GameRGBColor(0, 1, 1),
        new GameRGBColor(1, 1, 1)
    ],
    particleNoise:2
}
world.onPlayerJoin(async({entity})=>{
    await loadPlayer(entity)
    if(entity.player.name=='阿兹卡班毕业生'){
        entity.player.color=new GameRGBColor(1,0,1)
        Object.assign(entity, wcbl)
    }
    else if(admin.includes(entity.player.name)||adminpro.includes(entity.player.name)||entity.adminlevel>0){
        Object.assign(entity, particle_purpleCrystal)
    }
    else if(entity.greenlzxg==true||lzxglist.includes(entity.player.userKey)||lzxglist.includes(entity.player.name)){
        Object.assign(entity, particle_greenCrystal)
    }
    // 管理员sql与地图管理员列表同步
    // if(admin.includes(entity.player.name)){
    //     entity.isadmin=true;
    // }
    // if(entity.isPlayer==true&&admin.includes(entity.player.name)==false){
    //     admin.push(entity.player.name)
    // }
    // 检测网址中是否含有兑换码，如含有则使用
    var playerurl_string = entity.player.url;
    var playerurl  = new URL(playerurl_string);
    entity.duihuanma = playerurl.searchParams.get('code') as string
    use_duihuanma(entity)
    // 更换皮肤
    if(entity.usingskin!='原版'){
        entity.player.setSkinByName(entity.usingskin);
    }
})
// 商城
world.onPlayerPurchaseSuccess(({tick, userId, productId, orderId})=>{
    console.log(tick,userId,productId,orderId)
    if(productId==383036030006633){
        world.querySelectorAll('player').forEach((e)=>{
            if(e.player.userId==userId){
                world.say(i18n.t('chat.purchase_green_particle', {lng: e.lang, name: e.player.name}))
                log(i18n.t('logs.purchase_green_particle', {lng: e.lang}),e)
                Object.assign(e, particle_greenCrystal)
                dialog(i18n.t('dialogs.system', {lng: e.lang}),i18n.t('dialogs.purchase_success', {lng: e.lang}),e)
            }
        })
    }
    else if(productId==383030300586724){
        world.querySelectorAll('player').forEach((e)=>{
            if(e.player.userId==userId){
                world.say(i18n.t('chat.purchase_permanent_green_particle', {lng: e.lang, name: e.player.name}))
                log(i18n.t('logs.purchase_permanent_green_particle', {lng: e.lang}),e)
                e.greenlzxg=true;
                dialog(i18n.t('dialogs.system', {lng: e.lang}),i18n.t('dialogs.purchase_permanent_success', {lng: e.lang}),e)
            }
        })
    }
    else if(productId==383030715822999){
        world.querySelectorAll('player').forEach((e)=>{
            if(e.player.userId==userId){
                world.say(i18n.t('chat.purchase_exp', {lng: e.lang, name: e.player.name, exp: 200}))
                log(i18n.t('logs.purchase_exp', {lng: e.lang, exp: 200}),e)
                e.exp+=200;
                dialog(i18n.t('dialogs.system', {lng: e.lang}),i18n.t('dialogs.purchase_success', {lng: e.lang}),e)
            }
        })
    }
    else if(productId==383030715823005){
        world.querySelectorAll('player').forEach((e)=>{
            if(e.player.userId==userId){
                world.say(i18n.t('chat.purchase_exp', {lng: e.lang, name: e.player.name, exp: 500}))
                e.exp+=500;
                log(i18n.t('logs.purchase_exp', {lng: e.lang, exp: 500}),e)
                dialog(i18n.t('dialogs.system', {lng: e.lang}),i18n.t('dialogs.purchase_success', {lng: e.lang}),e)
            }
        })
    }
    world.querySelectorAll('player').forEach((e)=>{
        if(e.player.userId==userId){
            dialog(i18n.t('dialogs.system', {lng: e.lang}),i18n.t('dialogs.save_reminder', {lng: e.lang}),e)
        }
    })
})
// 收到客户端消息
remoteChannel.onServerEvent(({entity, args, tick})=>{
    if(args.type=='zxcommand'){
        try {
            world.say('<~ ' + eval(args.cmd))
        }
        catch (err) {
            world.say('<~ ' + err)
        }
    }
})
// 消息预览
world.onChat(({entity, message})=>{
    if(message.startsWith('$'))return
    world.say(`${entity.player_title=='玩家'?'':i18n.t('chat.title_prefix', {lng: entity.lang, title: entity.player_title})}${entity.player?.name??'undefined'}：` + message)
    lastmsg = `${entity.player_title=='玩家'?'':i18n.t('chat.title_prefix', {lng: entity.lang, title: entity.player_title})}${entity.player?.name??'undefined'}：` + message
})