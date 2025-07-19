// 数据库
// declare interface GamePlayerEntity extends GamePlayerEntity{ 
    
// };


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
    x: 0,
    y: 0,
    z: 0,
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
async function deletePlayerById(id) { // 删档
    await Storage.remove(id); // 删除玩家数据存档
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
    await loadPlayer(entity); // 载入玩家数据

});