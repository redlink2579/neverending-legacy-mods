G.AddData({
	name:'Theism',
	author:'Owen "Ohead" Parker',
	desc:'Adds Polytheism and Monotheism, both with different perks',
	engineVersion:1,
	requires:['Default dataset*'],
	func:function()
	{


        // Give everyone a bonus for polytheism
        for (let unit in G.unitByName) {
            if (G.dict[unit].effects)
                G.dict[unit].effects.push({type:'mult',value:1.01,req:{'polytheism':true}});
        }


        // Give political units a bonus for monotheism
        for (let unit in G.unitByName) {
            if (G.dict[unit].effects && G.dict[unit].category == 'political')
                G.dict[unit].effects.push({type:'mult',value:1.5,req:{'monotheism':true}});
        }

        new G.Trait({
            name:'monotheism',
            desc:'@[clan leader]s and [chieftain]s generate 50% more [influence]',
            icon:[24,1,9,5],
            chance:1,
            req:{'polytheism':false,'atheism':false,"belief in the afterlife":true},
        });

        new G.Trait({
            name:'polytheism',
            desc:'@all [worker]s have a very slight production boost',
            icon:[24,1,7,5],
            chance:1,
            req:{'monotheism':false,'atheism':false,"belief in the afterlife":true},
        });

        new G.Trait({
            name:'atheism',
            desc:'@reduced [happiness,unhappiness] from [corpse]s',
            icon:[24,1,6,4],
            chance:1,
            req:{'monotheism':false,'polytheism':false,"belief in the afterlife":true},
        });

	}
});