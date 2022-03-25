G.AddData({
	name:'Meditaters',
	author:'Owen "Ohead" Parker',
	desc:'Adds a meditater unit, who generates fast ticks.',
	engineVersion:1,
	func:function()
	{   
        new G.Unit({
            name:'meditater',
            desc:'@generates fast ticks every now and then<>A [meditater] is one with the land and the natural energy of the universe.',
            icon:[7,5],
            cost:{},
            use:{'worker':1},
            upkeep:{'coin':0.2},
            effects:[
                {type:'gather',what:{'faith':0.1,'happiness':0.2}},
                {type:'gather',what:{'faith':0.05},req:{'symbolism':true}}
            ],
            req:{'ritualism':true},
            category:'spiritual',
        });
	}
});