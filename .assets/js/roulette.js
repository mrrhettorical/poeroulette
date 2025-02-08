$(document).ready(function()
{
	const keystoneSlider = document.getElementById("numKeystones");
	const keystoneOutput = document.getElementById("lblNumKeystones");
	const skillSlider = document.getElementById("numSkills");
	const skillOutput = document.getElementById("lblNumSkills");
	const ascendancySlider = document.getElementById("numAscendancies");
	const ascendancyOutput = document.getElementById("lblNumAscendancies");
	
	// Show default slider values
	keystoneOutput.innerHTML = keystoneSlider.value;
	skillOutput.innerHTML = skillSlider.value;
	ascendancyOutput.innerHTML = ascendancySlider.value;
	
	// Update the current slider value (each time you drag the slider handle)
	keystoneSlider.oninput = function()
	{
		keystoneOutput.innerHTML = this.value;
	}
	skillSlider.oninput = function()
	{
		skillOutput.innerHTML = this.value;
	}
	ascendancySlider.oninput = function()
	{
		ascendancyOutput.innerHTML = this.value;
	}
});

function foo()
{
	$.ajax({
		type: "GET",
		url: "https://www.poewiki.net/w/api.php?action=cargoquery&tables=skill,skill_gems,items&join_on=skill._pageID=skill_gems._pageID,skill._pageID=items._pageID&fields=skill.active_skill_name,skill.skill_icon,skill.skill_id,skill_gems.primary_attribute,skill.html&where=skill.active_skill_name%20IS%20NOT%20NULL%20AND%20skill.active_skill_name%20!%3D%20%22...%22%20AND%20skill_gems.support_gem_letter%20IS%20NULL%20AND%20skill_gems.primary_attribute%20IS%20NOT%20NULL%20AND%20items.is_in_game%20%3D%201%20AND%20items.drop_enabled%20%3D%201%20AND%20skill_gems.is_vaal_skill_gem=0&format=json&limit=100",
		success: bar,
		async: false
	});
}

function bar(jsonData)
{
	// This feels really wrong but whatever
	for (let i = 0; i < jsonData.cargoquery.length; ++i)
	{
		$('#test').append('<hr>').append($.parseHTML(jsonData.cargoquery[i].title.html)[0].data);
	}
}

/*
Keystones
https://www.poewiki.net/w/api.php?action=cargoquery&tables=passive_skills&fields=name,icon,stat_text,id&where=is_keystone%3D1%20AND%20id%20NOT%20LIKE%20%22%25affliction_keystone%25%22%20AND%20id%20NOT%20LIKE%20%22%25atlas%25%22%20AND%20id%20NOT%20LIKE%20%22%25maraketh%25%22%20AND%20id%20NOT%20LIKE%20%22%25templar%25%22%20AND%20id%20NOT%20LIKE%20%22%25vaal%25%22%20AND%20id%20NOT%20LIKE%20%22%25karui%25%22%20AND%20id%20NOT%20LIKE%20%22%25eternal%25%22%20%20AND%20id%20NOT%20LIKE%20%22%25blight_special%25%22&format=json

Skills - Needs two queries
TODO - Find a way to exclude T-Gems and Auras
https://www.poewiki.net/w/api.php?action=cargoquery&tables=skill,skill_gems,items&join_on=skill._pageID=skill_gems._pageID,skill._pageID=items._pageID&fields=skill.active_skill_name,skill.skill_icon,skill.skill_id,skill_gems.primary_attribute,skill.html&where=skill.active_skill_name%20IS%20NOT%20NULL%20AND%20skill.active_skill_name%20!%3D%20%22...%22%20AND%20skill_gems.support_gem_letter%20IS%20NULL%20AND%20skill_gems.primary_attribute%20IS%20NOT%20NULL%20AND%20items.is_in_game%20%3D%201%20AND%20items.drop_enabled%20%3D%201%20AND%20skill_gems.is_vaal_skill_gem=0&format=json&limit=500
https://www.poewiki.net/w/api.php?action=cargoquery&tables=skill,skill_gems,items&join_on=skill._pageID=skill_gems._pageID,skill._pageID=items._pageID&fields=skill.active_skill_name,skill.skill_icon,skill.skill_id,skill_gems.primary_attribute,skill.html&where=skill.active_skill_name%20IS%20NOT%20NULL%20AND%20skill.active_skill_name%20!%3D%20%22...%22%20AND%20skill_gems.support_gem_letter%20IS%20NULL%20AND%20skill_gems.primary_attribute%20IS%20NOT%20NULL%20AND%20items.is_in_game%20%3D%201%20AND%20items.drop_enabled%20%3D%201%20AND%20skill_gems.is_vaal_skill_gem=0&format=json&limit=500&offset=500

Can add skill_gems.is_vaal_skill_gem=0 to exclude V-Gems

Ascendancies
https://www.poewiki.net/w/api.php?action=cargoquery&tables=ascendancy_classes&fields=name&group_by=name&format=json
*/