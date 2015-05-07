
define(['entity'], function(Entity) {

    var Item = Entity.extend({
        init: function(id, kind, type) {
    	    this._super(id, kind);

            this.itemKind = Types.getKindAsString(kind);
    	    this.type = type;
    	    this.wasDropped = false;
        },

        hasShadow: function() {
            return true;
        },

        onLoot: function(player) {
            if(this.type === "weapon") {
                if (Types.getWeaponRank(this.kind) > Types.getWeaponRank(Types.getKindFromString(player.weaponName))) {
                     player.switchWeapon(this.itemKind);
                }
            } else if(this.type === "armor") {
                if (Types.getArmorRank(this.kind) > Types.getArmorRank(Types.getKindFromString(player.spriteName))) {
                     player.armorloot_callback(this.itemKind);
                }
            }
        },

        getSpriteName: function() {
            return "item-"+ this.itemKind;
        },

        getLootMessage: function() {
            return this.lootMessage;
        }
    });
    
    return Item;
});