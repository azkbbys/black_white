/**
 * 扩展[游戏实体]的接口
 * 该接口继承自GameEntity，可以为[游戏实体]添加额外的属性或方法。
 */
declare interface GameEntity extends GameEntity {
    duihuanma: string;
    count: boolean;
    jindu: number;
    save: boolean;
    victory: boolean;
    cankick: boolean;
    exp: number;
    bag: string[];
    player_title: string;
    greenlzxg: boolean;
    x: number;
    y: number;
    z: number;
    leave_x: number;
    leave_y: number;
    leave_z: number;
    adminlevel: number;
    canplay: boolean;
    used_duihuanma: string[];
    skins: string[];
    usingskin: string;
    last_team: 0;
    jointime: {
        year: number,
        month: number,
        day: number,
        hour: number,
        minute: number
    };
    dimension: number;
    cundang_dimension: number;
};
