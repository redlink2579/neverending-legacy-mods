G.AddData({
	name:'Cremation',
		//required; the name of the mod - do not change this when updating the mod, as other mods will refer to this mod by its name
	author:'Owen "Ohead" Parker',
		//optional; the author of the mod
	desc:'Adds the cremation option for firekeepers once iron is unlocked',
		//optional; a simple description of the mod
	engineVersion:1,
		//optional; a list of mod names that this mod requires; this mod will fail loading if at least one of its required mods fails to load, has errors, or comes after it in the mod list
		//the specified mod names can be in the form of "mod name*", in which case the game will look for any mod with a name that begins with "mod name"
	func:function()
	{
		/*
		G.getUnit('firekeeper').modes['cremate'] = {
			name:'Cremate corpses',
			icon:[8,3],
			desc:'Clear out [corpse]s faster than they can be buried.'
		};
		G.getUnit('firekeeper')['effects'].push({
			type:'convert',
			from:{'corpse':10,'fire pit':0.01},
			into:{},
			every:1,
			repeat:10,
			mode:'cremate'
		});
		*/
	}
});