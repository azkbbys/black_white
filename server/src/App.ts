console.clear()
// 变量等
var admin:string[] = []
var adminpro:string[] = ['阿兹卡班毕业生','奶油a','羽岚.龍族[原]:Aoken','烤得酥脆的笨鼠','蓝鱼I恒星']
var logs:string[] = []
var lzxglist:string[] = []
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
    if(entity.position.z<=8){
        dialog_with_button(entity,
            '教程',
`关卡：教程1
hi there~${entity.player.name}，欢迎来到黑白跑酷！这里是新手教程
这个跑酷并不是一个普通的跑酷，在这个跑酷中，世界被分为了两个维度：黑与白。维度由四周墙体的颜色决定，电脑端按下E键即可切换维度。切换前后在两个维度中的相对位置不变。
现在就试试切换维度吧！`,
            ['知道了'])
    }
    else if(entity.position.z<=16){
        dialog_with_button(entity,
            '教程',
`关卡：教程2
现在，你已经知道了如何切换维度。
我要告诉你：两个维度中的地形可能不同！比如这个关卡正是如此。
现在，切换维度，思考一下如何过关吧！`,
            ['知道了'])
    }
    else if(entity.position.z<=24){
        dialog_with_button(entity,
            '教程',
`关卡：教程3
在这个关卡中，出现了新的东西——草莓酱！碰到它你就知道会发生什么了）））
合理切换维度过关！`,
            ['知道了'])
    }
    else if(entity.position.z<=32){
        dialog_with_button(entity,
            '教程',
`关卡：1
看来你应该掌握了这个游戏的玩法，接下来就要靠你自己摸索辣！
如果你觉得这个地图不错，记得点赞收藏哦~`,
            ['知道了'])
    }
    else if(entity.position.z<=40){
        dialog_with_button(entity,
            '提示',
`关卡：2
这个关卡...似乎...不能跳跃？！`,
            ['知道了'])
    }else if(entity.position.z<=80){}
    else if(entity.position.z<=88){
        dialog_with_button(entity,
            '提示',
`关卡：7
没错！！！这个关卡又是特殊关卡
在本关你的移动速度快的飞起！
什么你说你可以潜行？不好意思你潜行速度是0
当然，为了防止你信仰之跃，跳跃自然也是禁用了哒~`,
            ['知道了'])
    }
    else if(entity.position.z<=96){
        dialog_with_button(entity,
            '提示',
`关卡：8
你羽整了个花活，在这个关卡，当处在“黑”维度时正常，处在“白”维度时方向键反向！`,
            ['知道了'])
    }else if(entity.position.z<=104){}
    else if(entity.position.z<=112){
        dialog_with_button(entity,
            '提示',
`关卡：10
鸣谢：创意提供：乘风的小晚（50477944）
结合前2、3关：加速+白反向+禁跳+禁潜行`,
            ['知道了'])
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
    entity.player.directMessage(`重生`)
    entity.player.forceRespawn()
    entity.dimension=entity.cundang_dimension
}
async function dialog(title,content,entity){
    const result = await entity.player.dialog({
        type: GameDialogType.TEXT,
        title: title,
        content: content,
    });
}
function use_duihuanma(entity){
    if(entity.used_duihuanma.includes(entity.duihuanma)==true){
        dialog(`错误`,`这个兑换码已经使用过了`,entity)
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
        //                     dialog(`系统`,`兑换成功！\n获得${(parseInt(entity.duihuanmainlist[3])-99)/4}经验`,entity);
        //                     entity.exp+=(parseInt(entity.duihuanmainlist[3])-99)/4;
        //                     entity.used_duihuanma.push(entity.duihuanma);
        //                     savePlayer(entity);
        //                 }
        //                 else{
        //                     dialog(`错误`,`此兑换码已过期`,entity)
        //                 }
        //             }
        //             else{
        //                 dialog(`错误`,`此兑换码不存在`,entity)
        //             }
        //         }
        //         else{
        //             dialog(`错误`,`此兑换码不存在`,entity)
        //         }
        //     }
        // }
        if(entity.duihuanma=='苦力怕'){
            dialog(`系统`,`兑换成功，获得皮肤：苦力怕\n右键皮肤库里可以使用`,entity)
            if(entity.skins.includes('苦力怕')==false){
                entity.skins.push('苦力怕');
            }
            entity.used_duihuanma.push(entity.duihuanma);
            savePlayer(entity)
        }
        else if(entity.duihuanma=='史蒂夫'){
            dialog(`系统`,`兑换成功，获得皮肤：史蒂夫\n右键皮肤库里可以使用`,entity)
            if(entity.skins.includes('史蒂夫')==false){
                entity.skins.push('史蒂夫');
            }
            entity.used_duihuanma.push(entity.duihuanma);
            savePlayer(entity)
        }
        else if(entity.duihuanma=='新图限时福利'){
            dialog(`系统`,`兑换成功，获得100经验`,entity)
            entity.exp+=100 
            entity.used_duihuanma.push(entity.duihuanma);
            savePlayer(entity)
        }
        // else if(entity.duihuanma=='旧版福利'){
        //     dialog(`系统`,`欢迎来到全新的毕业生跑酷！已自动领取经验*1000`,entity)
        //     entity.exp+=1000
        //     entity.used_duihuanma.push(entity.duihuanma);
        //     savePlayer(entity)
        // }
        // else if(entity.duihuanma=='壹周年'){
        //     dialog(`系统`,`欢迎来到全新的毕业生跑酷！已自动领取经验*3650`,entity)
        //     entity.exp+=3650
        //     entity.used_duihuanma.push(entity.duihuanma);
        //     savePlayer(entity)
        // }
        // else if(entity.duihuanma=='记忆碎片1'){
        //     dialog(`系统`,`获得经验*100`,entity)
        //     entity.exp+=100
        //     entity.used_duihuanma.push(entity.duihuanma);
        //     savePlayer(entity)
        // }
        // else{
        //     dialog(`错误`,`兑换码不存在`,entity)     
        // }
    }
    catch(e){
        return
    }
}
// 数据库
var Storage = storage.getGroupStorage('cundang'); // 获取数据库，名称为 cundang

const CorrespondingName = { // 在此添加排行榜对应的单位和名称（无名称 则表示不显示名称）
    'exp': ['经验', '无名称']
};

const unsavedData = { // 玩家初始无需保存的数据，可增添或删除
    victory: false,
    cankick: true,
};

const savedData = { // 玩家初始需要保存的数据，可增添或删除
    jindu: 100,
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
    time: 0
};

/**
 * 初始化玩家数据
 * 
 * @param {GameEntity} entity
 */
function initPlayer(entity) { // 初始化玩家数据
    Object.assign(entity, savedData);
    Object.assign(entity, unsavedData);
};

/**
 * 获取玩家数据
 * 
 * @param {GameEntity} entity
 */
function getPlayerData(entity) { // 获取玩家数据
    var data = { 'name': entity.player.name };
    for (let i in savedData) { // 遍历savedData，获取玩家当前数据
        data[i] = entity[i];
    };
    return data;
};

/**
 * 存档
 * 
 * @param {GameEntity} entity
 */
async function savePlayer(entity) { // 存档
    entity.leave_x = entity.position.x;
    entity.leave_y = entity.position.y;
    entity.leave_z = entity.position.z;
    await Storage.update(entity.player.userId, () => {  // 更新玩家数据存档
        return getPlayerData(entity);
    });
};

/**
 * 删档
 * 
 * @param {GameEntity} entity
 */
async function deletePlayer(entity) { // 删档
    entity.save = false
    await Storage.remove(entity.player.userId); // 删除玩家数据存档
};
async function deletePlayerByUserid(userid) { // 通过userid删档
    await Storage.remove(userid); // 删除玩家数据存档
};

/**
 * 读档
 * 
 * @param {GameEntity} entity
 */
async function loadPlayer(entity) { // 读档
    initPlayer(entity);
    var data = await Storage.get(entity.player.userId); // 获取数据
    if (data) { // 如果数据存在
        Object.assign(entity, data.value);
        entity.player.directMessage('已为您读取数据！');
    } else { // 如果数据不存在
        await Storage.set(entity.player.userId, getPlayerData(entity));
        entity.player.directMessage('已为您创建数据！');
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
                await Storage.remove(sqlData.key)
            }
            if (sqlDataList.isLastPage) break; // 如果已经是最后一页，退出循环
            await sqlDataList.nextPage(); // 下一页
        };
    } catch (e) {}
};

/**
 * 显示排行榜
 * 
 * @param {string} type
 */
async function leaderBoard(type) { // 排行榜
    var list = [];
    var sqlDataList = await Storage.list({ // 将数据库内的所有数据分页
        cursor: 0
    });
    while (true) {
        for (let sqlData of sqlDataList.getCurrentPage()) { // 遍历获取数据
            list.includes([sqlData.value['name'], sqlData.value[type]]) ? null : list.push([sqlData.value['name'], sqlData.value[type]]);
        }
        list = list.sort((a, b) => b[1] - a[1]).slice(0, 100);
        if (sqlDataList.isLastPage) break; // 如果已经是最后一页，退出循环
        await sqlDataList.nextPage(); // 下一页
    };
    return list.map((value, num) => // 将列表里的所有项依次替换成字符串
        `第${num + 1}名 | ${value[0]} | ${value[1]} ${CorrespondingName[type][0]}${CorrespondingName[type][1] != '无名称' ? CorrespondingName[type][1] : ''}`
    ).join("\n"); // 按照 换行 的间隔组合成字符串
};

world.onPlayerJoin(async({ entity }) => {
    log(`加入`,entity)
    await loadPlayer(entity); // 载入玩家数据
    entity.position.set(entity.leave_x,entity.leave_y,entity.leave_z)
    entity.player.spawnPoint.set(entity.x,entity.y,entity.z)
});
world.onPlayerLeave(async({ entity }) => {
    await savePlayer(entity); // 保存玩家数据
});

// 右键菜单&左键切换维度
world.onPress(async({button,entity})=>{
    if(button==='action1'){
        const result = await entity.player.dialog({
            type: GameDialogType.SELECT,
            title: '游戏菜单',
            content:`你有${entity.exp}经验\n你已用时${entity.time}秒\n`+ `你的血量：`+entity.hp+`/`+entity.maxHp+`\n你的坐标：`+entity.position,
            options:['兑换码','数据相关','经验排行榜','皮肤库','商店','背包','重来','脱离卡点','切换人称','bug反馈','禁言玩家说话','✨用爱，发电！','管理员工具']
        });
        if(!result || result.value === null){ 
            return; 
        }
        else if(result.value=='✨用爱，发电！'){
            entity.player.link(`https://afdian.com/a/azkbbys`, {isConfirm: false, isNewTab: true})
        }
        else if(result.value=='选择附图'){
            entity.position.set(97,40,74);
            dialog(`系统`,`你已进入附图选择区域，与dream互动即可选择附图，要退出请右键点击“脱离卡点”`,entity)
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
        else if(result.value=='关于gameUi'){
            const result = await entity.player.dialog({
                type: GameDialogType.SELECT,
                title: 'gameUi',
                content:`选择你要进行的操作`,
                options:['取消操作','关闭gameUi','刷新gameUi内容/开启gameUi','刷新gameUi大小']
            });
            if(!result || result.value === null){ 
                return; 
            }
            else if(result.value=='关闭gameUi'){
                remoteChannel.sendClientEvent(entity, {type:'command',args:'close'})
                entity.player.directMessage(`已关闭`)
            }
            else if(result.value=='刷新gameUi内容/开启gameUi'){
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
                entity.player.directMessage(`刷新/开启成功`)
            }
            else if(result.value=='刷新gameUi大小'){
                remoteChannel.sendClientEvent(entity, {
                    type: '刷新大小',
                    args: null
                })
                entity.player.directMessage(`当前暂不支持刷新，请刷新网页即可`)
            }
        }
        else if(result.value=='兑换码'){
            entity.duihuanma = await entity.player.dialog({
                type: GameDialogType.INPUT,
                title: '兑换',
                content: `输入你所获得的兑换码\n兑换码可以在Q群763919859获得！`,
                confirmText: '确认',
            });
            if(!entity.duihuanma || entity.duihuanma === null){ 
                entity.player.link(`http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=Atg_SCPUyp2d8yAAxjaozzjFH3eu198J&authKey=ohyqS%2FYbJ%2F3C%2BkzrFVQSS7wJoeifKFxeo8SNr4KsX7fey6sx%2Fy%2FX7JEF%2Bvtkryd1&noverify=0&group_code=763919859`, {isConfirm: false, isNewTab: true})
            }
            else{
                use_duihuanma(entity)
            }
        }
        else if(result.value=='数据相关'){
            const result = await entity.player.dialog({
                type: GameDialogType.SELECT,
                title: 'sql相关',
                content:`这里是有关sql的功能，请选择：`,
                options:['✔存档','❌删档']
            });
            if(!result || result.value === null){ 
                return; 
            }
            else if(result.value=='✔存档'){
                savePlayer(entity);
                dialog(`系统`,`存档成功！\n每次踩到存档点会自动进行所有数据的保存`,entity)
            }
            else if(result.value=='❌删档'){
                const result = await entity.player.dialog({
                    type: GameDialogType.SELECT,
                    title: '你确定要删档吗？',
                    content:`你确定要删档吗？\n删档后一切数据将消失！\n不能后悔！`,
                    options:['不确定','算了','没想好','不删','删了吧']
                });
                if(result.value=='删了吧'){
                    Object.assign(entity, savedData);
                    savePlayer(entity);
                    entity.player.kick();
                }
            }
        }
        else if(result.value=='经验排行榜'){
            await entity.player.dialog({
                type: GameDialogType.SELECT,
                title: '排行',
                content: await leaderBoard('exp'),
                options: ['确认']
            });
        }
        else if(result.value=='皮肤库'){
            const result = await entity.player.dialog({
                type: GameDialogType.SELECT,
                title: '选择皮肤',
                content:`请选择要使用的皮肤`,
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
            entity.player.directMessage('切换成功')
        }
        else if(result.value=='商店'){
            const result = await entity.player.dialog({
                type: GameDialogType.SELECT,
                title: '你要买点啥？',
                content:`你要买点啥？\n你有${entity.exp}经验\n说明：名称（价格）（备注）`,
                options:['退出',
                '永久绿色粒子效果（150exp）（全图同步）',
                '永久苦力怕皮肤（500exp）（全图同步）（鬼知道作者把皮肤做成了啥样）',
                '永久史蒂夫皮肤（500exp）（全图同步）（还原度还是可以的吧）',
                '一次性飞行特权（70exp）（开启飞行权限，仅能在一个地图使用！有效期：2s）',
                '一次性飞行变速器（5exp）（更改飞行速度，仅能在一个地图使用！使用前提：已经开启飞行）',
                '缩小药水（70exp）（一次性，将角色大小缩小50%，不可叠加使用）',
                '还原药水（1exp）（一次性，将角色大小还原',
                '放大药水（70exp）（一次性，将角色大小增大50%，不可叠加使用）']
            });
            if(!result || result.value === null){ 
                return; 
            }
            else if(result.value=='永久绿色粒子效果（150exp）（全图同步）'){
                if(entity.exp>=150){
                    entity.exp-=150;
                    entity.greenlzxg=true;
                    savePlayer(entity);
                    entity.player.directMessage(`购买成功，已自动使用，刷新后生效`)
                }
                else{
                    dialog(`错误`,`经验不够！`,entity)
                }
            }
            else if(result.value=='永久苦力怕皮肤（500exp）（全图同步）（鬼知道作者把皮肤做成了啥样）'){
                if(entity.exp>=500&&entity.skins.includes('苦力怕')==false){
                    entity.exp-=500;
                    entity.skins.push('苦力怕')
                    savePlayer(entity);
                    entity.player.directMessage(`购买成功，已放入皮肤库，可右键点击“皮肤库”使用`)
                }
                else{
                    dialog(`错误`,`经验不够或已拥有皮肤`,entity)
                }
            }
            else if(result.value=='永久史蒂夫皮肤（500exp）（全图同步）（还原度还是可以的吧）'){
                if(entity.exp>=500&&entity.skins.includes('史蒂夫')==false){
                    entity.exp-=500;
                    entity.skins.push('史蒂夫')
                    savePlayer(entity);
                    entity.player.directMessage(`购买成功，已放入皮肤库，可右键点击“皮肤库”使用`)
                }
                else{
                    dialog(`错误`,`经验不够或已拥有皮肤`,entity)
                }
            }
            else if(result.value=='一次性飞行特权（70exp）（开启飞行权限，仅能在一个地图使用！有效期：2s）'){
                if(entity.exp>=80){
                    entity.exp-=80;
                    entity.bag.push('一次性飞行特权')
                    savePlayer(entity);
                    entity.player.directMessage(`购买成功，已放入背包`)
                }
                else{
                    dialog(`错误`,`经验不够！`,entity)
                }
            }
            else if(result.value=='一次性飞行变速器（5exp）（更改飞行速度，仅能在一个地图使用！使用前提：已经开启飞行）'){
                if(entity.exp>=5){
                    entity.exp-=5;
                    entity.bag.push('一次性飞行变速器')
                    savePlayer(entity);
                    entity.player.directMessage(`购买成功，已放入背包`)
                }
                else{
                    dialog(`错误`,`经验不够！`,entity)
                }
            }
            else if(result.value=='缩小药水（70exp）（一次性，将角色大小缩小50%，不可叠加使用）'){
                if(entity.exp>=70){
                    entity.exp-=70;
                    entity.bag.push('一次性缩小药水')
                    savePlayer(entity);
                    entity.player.directMessage(`购买成功，已放入背包`)
                }
                else{
                    dialog(`错误`,`经验不够！`,entity)
                }
            }
            else if(result.value=='还原药水（1exp）（一次性，将角色大小还原'){
                if(entity.exp>=1){
                    entity.exp-=1;
                    entity.bag.push('一次性还原药水')
                    savePlayer(entity);
                    entity.player.directMessage(`购买成功，已放入背包`)
                }
                else{
                    dialog(`错误`,`经验不够！`,entity)
                }
            }
            else if(result.value=='放大药水（70exp）（一次性，将角色大小增大50%，不可叠加使用）'){
                if(entity.exp>=70){
                    entity.exp-=70;
                    entity.bag.push('一次性放大药水')
                    savePlayer(entity);
                    entity.player.directMessage(`购买成功，已放入背包`)
                }
                else{
                    dialog(`错误`,`经验不够！`,entity)
                }
            }
        }
        else if(result.value=='背包'){
            const result = await entity.player.dialog({
                type: GameDialogType.SELECT,
                title: '你要使用啥？',
                content:`你要使用啥？\n警告：点击后立即使用无确认\n退出请点X`,
                options:entity.bag
            });
            if(!result || result.value === null){ 
                return; 
            }
            else if(result.value=='一次性飞行特权'){
                entity.player.canFly=true;
                let index = entity.bag.indexOf('一次性飞行特权');
                if (index !== -1) {
                    entity.bag.splice(index, 1);
                }
                savePlayer(entity)
                entity.player.canFly=true;
                entity.player.directMessage('使用成功，2s后降落');
                await sleep(2000);
                entity.player.canFly=false;
            }
            else if(result.value=='一次性飞行变速器'){
                let index = entity.bag.indexOf('一次性飞行变速器');
                if (index !== -1) {
                    entity.bag.splice(index, 1);
                }
                const flyspeed:string = await entity.player.dialog({
                    type: GameDialogType.INPUT,
                    title: '自定义飞行速度',
                    content: `输入飞行速度，不要试探服务器极限`,
                    confirmText: '确认',
                });
                entity.player.flySpeed=parseInt(flyspeed)
                savePlayer(entity)
                entity.player.directMessage('使用成功')
            }
            else if(result.value=='一次性缩小药水'){
                let index = entity.bag.indexOf('一次性缩小药水');
                if (index !== -1) {
                    entity.bag.splice(index, 1);
                }
                entity.player.scale=0.5
                savePlayer(entity)
                entity.player.directMessage('使用成功')
            }
            else if(result.value=='一次性还原药水'){
                let index = entity.bag.indexOf('一次性还原药水');
                if (index !== -1) {
                    entity.bag.splice(index, 1);
                }
                entity.player.scale=1
                savePlayer(entity)
                entity.player.directMessage('使用成功')
            }
            else if(result.value=='一次性放大药水'){
                let index = entity.bag.indexOf('一次性放大药水');
                if (index !== -1) {
                    entity.bag.splice(index, 1);
                }
                entity.player.scale=1.5
                savePlayer(entity)
                entity.player.directMessage('使用成功')
            }
            else if(result.value=='无限飞行羽翼'){
                entity.player.canFly=true;
                entity.player.directMessage('使用成功')
            }
        }
        else if(result.value=='重来'){
            if(entity.canplay==false){
                dialog(`系统`,`你在封禁中，不能出来`,entity)
            }
            else{
                entity.player.spectator=false;
                entity.player.directMessage(`重新开始，已重置计时器！`)
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
        else if(result.value=='脱离卡点'){
            if(entity.canplay==false){
                dialog(`系统`,`你在封禁中，不能出来`,entity)
            }
            else{
                entity.player.forceRespawn()
                // entity.ingjf=false;
                entity.player.directMessage('脱离成功！')
            }
        }
        // else if(result.value=='进入/离开挂机房'){
        //     if(entity.canplay==false){
        //         dialog(`系统`,`你在封禁中，不能出来`,entity)
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
        //         entity.player.directMessage('正在俯视全图，再次点击按钮可退出')
        //         entity.fsqting=true
        //     }
        //     else{
        //         entity.player.cameraEntity=entity
        //         entity.fsqting=false
        //     }
        // }
        else if(result.value=='切换人称'){
            if (entity.player.cameraMode === GameCameraMode.FOLLOW) {
                entity.player.cameraMode = GameCameraMode.FPS
                entity.player.directMessage(`切换成功`)
            }
            else {
                entity.player.cameraMode = GameCameraMode.FOLLOW
                entity.player.directMessage(`切换成功`)
            }
        }
        else if(result.value=='bug反馈'){
            dialog(`作者`,`反馈问题请发在评论区，也可以发作者邮箱oyroyroyr@163.com，如果采纳会赠送地图绿色粒子特效`,entity)
        }
        else if(result.value=='禁言玩家说话'){
            const result = await entity.player.dialog({
                type: GameDialogType.INPUT,
                title: '禁言玩家说话',
                content: `你想要说啥`,
                confirmText: '“警告！非禁言玩家尽量不要使用！”',
            });
            if(!result || result === null){
                return; 
            }
            else {
                world.say(entity.player.name+'：'+result)
            }
        }
        else if(result.value=='管理员工具'){
            if(admin.includes(entity.player.name)||entity.adminlevel>0||adminpro.includes(entity.player.name)){
                const result = await entity.player.dialog({
                    type: GameDialogType.SELECT,
                    title: '管理员工具',
                    content: `选择你需要使用的工具`,
                    options:['管理员命令文档','查看日志','创建临时聊天频道','销毁临时聊天频道','飞行','降落','开启/关闭穿墙','切换bgm','玩家传送器','传送至某玩家','计时器','广播公告']
                });
                if(!result || result.value === null){ 
                    return; 
                }
                else if(result.value=='管理员命令文档'){
                    entity.player.link(`https://azkbbys.gitbook.io/azkbbys/docs/bysrunpro/bysrunpro-admin-code-tutorial`, {isConfirm: false, isNewTab: true})
                }
                else if(result.value=='查看日志'){
                    entity.player.dialog({
                        type: GameDialogType.SELECT,
                        title: '日志',
                        content:`日志内容：\n${logs.join('\n')}`,
                        options:['关闭']
                    })
                }
                else if(result.value=='创建临时聊天频道'){
                    const result = await entity.player.dialog({
                        type: GameDialogType.INPUT,
                        title: '创建临时聊天频道',
                        content: `输入所有要加入的人的id，空格分割`,
                        confirmText: '确认',
                    });
                    if(!result || result === null){ 
                        return; 
                    }
                    else{
                        entity.player.directMessage(`创建成功！${result.split(' ')}。ID为${await world.createTempChat(result.split(' '))}`)
                    }
                }
                else if(result.value=='销毁临时聊天频道'){
                    const result = await entity.player.dialog({
                        type: GameDialogType.SELECT,
                        title: '选择',
                        content:`请选择你要销毁的临时聊天频道`,
                        options:await world.getTempChats()
                    });
                    if(!result || result.value === null){ 
                        return; 
                    }
                    else{
                        world.destroyTempChat([result.value])
                        entity.player.directMessage(`销毁成功！${result.value}`)
                    }
                }
                else if(result.value=='飞行'){
                    entity.player.canFly=true
                    entity.player.directMessage('您可以飞行了')
                }
                else if(result.value=='降落'){
                    entity.player.canFly=false
                    entity.player.directMessage('降落成功')
                    const allWearables = entity.player.wearables();
                    // allWearables.forEach((item) => {
                    //     item.remove();
                    // });
                }
                else if(result.value=='开启/关闭穿墙'){
                    if(entity.player.spectator==false){
                        entity.player.spectator=true
                    }
                    else{
                        entity.player.spectator=false
                    }
                }
                else if(result.value=='玩家传送器'){
                    const playernamelist = []
                    world.querySelectorAll('player').forEach((e)=>{
                        if(e.player.name!=entity.player.name)
                        playernamelist.push(e.player.name)
                    })
                    const result = await entity.player.dialog({
                        type: GameDialogType.SELECT,
                        title: '传送至某玩家',
                        content: `你要传送谁到你的位置`,
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
                                entity.player.directMessage('传送成功！')
                            };
                        };
                    }
                }
                else if(result.value=='传送至某玩家'){
                    const playernamelist = []
                    world.querySelectorAll('player').forEach((e)=>{
                        if(e.player.name!=entity.player.name)
                        playernamelist.push(e.player.name)
                    })
                    const result = await entity.player.dialog({
                        type: GameDialogType.SELECT,
                        title: '传送至某玩家',
                        content: `你要传送你到谁的位置`,
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
                                entity.player.directMessage('传送成功！')
                            };
                        };
                    }
                }
                else if(result.value=='计时器'){
                    const result = await entity.player.dialog({
                        type: GameDialogType.INPUT,
                        title: '计时器',
                        content: `你想计时多久`,
                        confirmText: '“确定”',
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
                            if(h>=3){;entity.player.directMessage('计时最多3小时');return;}
                            entity.player.directMessage(h+':'+m+':'+s)
                            await sleep(1000)
                        }
                    }
                    else{
                        entity.player.directMessage('计时器关闭！')
                    }
                }
                else if(result.value=='广播公告'){
                    const result = await entity.player.dialog({
                        type: GameDialogType.INPUT,
                        title: '广播公告',
                        content: `输入广播内容`,
                        confirmText: '确认广播',
                    });
                    world.say(result)
                }
            }
        }
    }
    else if(button=='action0'){
        entity.dimension==1?entity.position.x+=64:entity.position.x-=64
        entity.dimension==1?entity.dimension=2:entity.dimension=1
        entity.player.directMessage(`切换维度成功`)
        // log(`切换维度至 ${entity.dimension==1?'黑':'白'}`,entity)
    }
})

// 重生和检测
world.onPlayerJoin(({entity})=>{
    world.onTick(({tick})=>{
        if(tick%16==0){
            entity.time+=1
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
    })
})
world.onFluidEnter(({entity, tick, voxel}) => {
    const voxelName = voxels.name(voxel)
    if (voxelName=='strawberry_juice'){
        entity.player.forceRespawn()
        entity.player.directMessage(`你落入了草莓酱！`)
    }
})

// 管理员代码
world.onChat(({ entity, message }) => {
    if(adminpro.includes(entity.player.name)||entity.adminlevel>1){
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
        savePlayer(other);
        entity.player.directMessage('存档成功，经验+1！');
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
        entity.player.directMessage(`进入下一关`)
        entity.position.set(3,4,e.position.z+8)
        log(`进入下一关`,entity)
    })
})
const switch_dimension= world.querySelector('#切换')
switch_dimension.enableInteract=true
switch_dimension.interactHint=''
switch_dimension.interactRadius=100000000
switch_dimension.onInteract(({entity})=>{
    entity.dimension==1?entity.position.x+=64:entity.position.x-=64
    entity.dimension==1?entity.dimension=2:entity.dimension=1
    entity.player.directMessage(`切换维度成功`)
    log(`切换维度至 ${entity.dimension==1?'黑':'白'}`,entity)
})
const win= world.querySelector('#终点')
// win.enableInteract=true
// win.interactHint='终点'
// win.interactRadius=3
// win.onInteract(({entity})=>{
//     if(entity.victory==true)return
//     world.say(`恭喜${entity.player.name} 到达终点，用时${entity.time}秒`)
//     entity.victory = true
//     entity.player.spectator=true
//     entity.player.color = new GameRGBColor(0, 1, 0)
//     entity.exp+=100
//     dialog_with_button(entity, `恭喜`, `恭喜你到达终点！\n用时${entity.time}秒\n你已获得飞行穿墙权限与100经验`, ['确定'])
//     log(`到达终点，用时${entity.time}`)
// })
win.onEntityContact(({other})=>{
    if(!other.player)return;
    let entity = other as GamePlayerEntity
    if(entity.victory==true)return
    if(entity.adminlevel>=1&&entity.time<=250){
        entity.adminlevel=0
        savePlayer(entity)
        dialog_with_button(entity, ``, `滥用管理权限，你已不再是管理员`, ['知道了'])
        return
    }
    world.say(`恭喜${entity.player.name} 到达终点，用时${entity.time}秒`)
    entity.victory = true
    entity.player.spectator=true
    entity.player.color = new GameRGBColor(0, 1, 0)
    entity.exp+=100
    dialog_with_button(entity, `恭喜`, `恭喜你到达终点！\n用时${entity.time}秒\n你已获得飞行穿墙权限与100经验`, ['确定'])
    log(`到达终点，用时${entity.time}`,entity)
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
    particleSize: [1.5, 1.5, 1.5, 1.5, 1.5],
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
    entity.duihuanma = playerurl.searchParams.get('code')
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
                world.say(`${e.player.name} 购买了一次性绿色粒子效果体验！`)
                log(`购买了一次性绿色粒子效果体验`,e)
                Object.assign(e, particle_greenCrystal)
                dialog(`提示`,`购买成功！粒子效果已生效`,e)
            }
        })
    }
    else if(productId==383030300586724){
        world.querySelectorAll('player').forEach((e)=>{
            if(e.player.userId==userId){
                world.say(`${e.player.name} 购买了永久绿色粒子效果！`)
                log(`购买了永久绿色粒子效果`,e)
                e.greenlzxg=true;
                dialog(`提示`,`购买成功！请手动点击保存后重进地图，粒子效果就会生效啦~`,e)
            }
        })
    }
    else if(productId==383030715822999){
        world.querySelectorAll('player').forEach((e)=>{
            if(e.player.userId==userId){
                world.say(`${e.player.name} 购买了200经验！`)
                log(`购买了200经验`,e)
                e.exp+=200;
                dialog(`提示`,`购买成功！`,e)
            }
        })
    }
    else if(productId==383030715823005){
        world.querySelectorAll('player').forEach((e)=>{
            if(e.player.userId==userId){
                world.say(`${e.player.name} 购买了500经验！`)
                e.exp+=500;
                log(`购买了500经验`,e)
                dialog(`提示`,`购买成功！`,e)
            }
        })
    }
    world.querySelectorAll('player').forEach((e)=>{
        if(e.player.userId==userId){
            dialog(`提示`,`请自行点击保存，否则数据丢失作者不负责任`,e)
        }
    })
})