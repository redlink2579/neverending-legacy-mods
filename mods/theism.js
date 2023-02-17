G.AddData({
	name:'Theism',
	author:'Owen "Ohead" Parker',
	desc:'Adds Polytheism and Monotheism, both with different perks',
	engineVersion:1,
	requires:['Default dataset*'],
	func:function()
	{

        for (let unit in G.unitByName) {
            G.dict[unit].push({type:'mult',value:1.01,req:{'polytheism':true}})
        }

		new G.Trait({
            name:'monotheism',
            desc:'@[clan leader]s and [chieftain]s generate more [influence]',
            icon:[20,1],
            chance:1,
            req:{'polytheism':false,"belief in the afterlife":true},
        });

        new G.Trait({
            name:'polytheism',
            desc:'@all [worker]s have a very slight production boost',
            icon:[20,1],
            chance:1,
            req:{'monotheism':false,"belief in the afterlife":true},
        });

	}
});