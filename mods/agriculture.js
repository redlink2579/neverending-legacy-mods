G.AddData({
	name:'Agriculture',
	author:'Owen "Ohead" Parker',
	desc:'Adds various farming units.',
	engineVersion:1,
	func:function()
	{   
        G.contextNames['grow']='Growing';

        new G.Tech({
            name:'agriculture',
            desc:'@unlocks [orchard]s<>[orchard]s provide [fruit] much faster than a gather can.@unlocks ',
            icon:[4,7,23,1],
            cost:{'insight':15},
            req:{'sedentism':true},
            effects:[
                {type:'show context',what:['orchard']},
            ],
        });

        new G.Unit({
            name:'orchard',
            desc:'@generates [fruit]<>An [orchard] provides [fruit] much faster than a gather can.',
            icon:[4,7],
            cost:{'fruit':15},
            use:{'worker':2,'land':5},
            upkeep:{'coin':0.2},
            effects:[
                {type:'gather',context:'grow',what:{'fruit':15}},
                {type:'mult',value:1.2,req:{'harvest rituals':'on'}}
            ],
            req:{'agriculture':true},
            category:'production',
        });

        new G.Unit({
            name:'grain farm',
            desc:'@generates [grain]<>[grain] can be baked into [bread], a stable food source',
            icon:[4,7],
            cost:{},
            use:{'worker':5,'land':10},
            upkeep:{'coin':0.5},
            effects:[
                {type:'gather',context:'grow',what:{'grain':15}},
                {type:'mult',value:1.2,req:{'harvest rituals':'on'}}
            ],
            req:{'agriculture':true},
            category:'production',
        });
	}
});