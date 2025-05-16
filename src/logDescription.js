// src/logDescriptions.js

const logFileDescriptions = {
  "log3.json": `Changes 4/22/2025
- Reworked SCP-173's vision logic.
- Adjusted spectator menu logic to hopefully work better when multiple players use the same display name.
- Increased 076-2's knife damage.
- 076-2's weapons now deal ballistic damage, which body armor protects against.
- Private server owners can now freecam with Shift+P.
- More adjustments to spectate menu.
- SCP-173 no longer bleeds when shot. It should be easier to see as them now.
- Fixed forcefield grenades breaking the grenade hotkey.
- Added button to toggle visibility of spectators in the spectate menu. This is toggled off by default.
- Players now immediately become a spectator on death. You can no longer send one last message before returning to lobby.
- SCPs 035 and 049-2 now use the female rig if the player has that selected in player customization.
- Gasmasks have been reworked into customization options. Several have been added to the customization menu.
- Spectators no longer get jumpscared by SCPs.
- Fixed an issue where guns that have hold-open animations would sometimes break if loaded by the client too quickly.`,
"log6.json" : `Changes 5/14/2025
- Reworked votekick system to now include a tiered "reputation" system.
- The amount of endorsements required for a votekick to succeed now depends on your reputation level.
- Expanded in-game moderation tools.
- Votekicks now have their own GUI element to circumvent the issue where server messages sometimes do not fully appear in chat.
- Reorganized pity to be part of a new usersettings datastore. This has reset pity.
- Added a "Forfeit Pity" button to the spectator menu for players that do not wish to play as SCPs.
- Reverted points rewarded for SCP-049 Resurrection to 1 point.
- Increased SCP-049-2 rage speed by 2.
- SCP-049-2 instances now get +30% damage reduction for the duration of the doctor's Mark ability.
- Increased cooldown of SCP-049's Mark ability by 10 seconds.
- Rare spawn of small NTF group at start of round replaced with TACREP.
- SCP-049-2 wake up animation speed increased by 50%.  -  Server - Script:42
- Nerfed the health and shield of SCP-173 and SCP-096.
- Lowered SCP-096 damage reduction during rage by 5%.
- Decreased SCP-096's rage duration by 5 seconds.
- Increased SCP-096's bonus-rage-time-on-kill by 1s.
- Added blood decals to gunshot wounds.
- Improved script security and error handling, hopefully fixing the infinite round bug.
- Game now detects when players fall into the void and properly respawns them.
- Since void deaths are now handled, the reset button and /unstuck command have been disabled.`,
"log5.json" : `Changes 5/10/2025
- Civilian roles now spawn with no ammo.
- Security roles spawn with 50% rifle and shotgun ammo.
- Spies and sympathizers now spawn with 15 pistol rounds instead of 80.
- Fixed some issues with the reinforcement timer.
- Decreased GOC Whitesuit damage resistance and spawn frequency.
- Fixed door/wall collision issues for some rooms.
- Fixed Abel's spear so that it actually yoinks corpses again.
- Removed Abel's passive which scales his shield based on nearby enemies.
- Added shield-scaling system for SCPs where they get 1% of damage reduction per living player. This also sort of acts as a player counter for them to see how many humans remain.
- Removed the scaling health/shield of SCPs in favor of the scaling damage reduction. This means SCP scaling is very different right now and balance updates will be made today to accomodate.
- SCP-049 gets a small walkspeed boost after marking a player.
- SCP-049-2's walkspeed boost on mark increased slightly.
- Rewrote the friendly-healthbar logic to hopefully fix an issue where sometimes you wouldn't see any nameplates above friendlies.
- Added CI/SH emblems above spies so friendlies can see better who their spy allies are.
- Fixed an oversight where SH members would be given the overhead chevrons that allow SCPs to see eachother through walls.
- Removed Classdobrine.`,
  "log2.json": `Changes 4/21/2025
- Fixed 076-2's spear FOV change persisting if you unequip the spear after raising it.
- Fixed 076-2's Vengeance audio effects persisting after death.
- 076-2's ranged weapons now move faster and are handled by the client. This should make them feel better to use.
- 076-2's sword now consumes less stamina during his Vengeance phase.`,
"log4.json": `Changes 4/23/2025
Thaumaturges have had their Curse temporarily disabled to see if that is what is causing people to crash. Please alert me on Discord if you crash when you spawn as one.

- Disabled SH Thaumaturge's Curse spell.
- Adjustments to server log.
- Adjustments to explosion system.
- Fixed a bug where left-clicking on headgear would break the inventory.
- Wearing SCP-035 should now successfully reward points to the SCP team.
- Killing spectators should no longer add "Label" to the server log.
- Fixed some vulnerabilities with votekicks and RichText.
- Fixed FP Doctor's viewmodel not appearing.
- Added player bounds to SCP-914's room.
- Tweaks to the player nameplate and diamond icons to hopefully fix spies/sympathizers.
- SCP-207 now also increases your stamina regen rate.
- Gave Glasses to all civvie classes.
- Finally remembered to update SCP-096 and SCP-076-2's spawn goal UI.`,
  "log.json": `Changes 4/20/2025
- Grenades can no longer be thrown after dying.
- Grenades now store their thrower's team, so persistent grenades (like incendiaries) shouldn’t hurt teammates after you die.
- SCP-049 gets points for resurrecting people again.
- SCP-049-2 instances reward only 1 point for killing them.
- Added a new playable SCP to the roster.
- Anchored SCP-207's room.
- Tried switching SCP-173's blink ability to using Shapecasts instead of Raycasts; it ended up being worse so further experimentation is required. Be careful when teleporting near corners where floors/walls meet.
- Customization character no longer rotates.
- Unlocking mouse as spectator now defaults to showing spectate menu.
- Added more hair options for player customization.
- Added glasses to Scientist customization.
- Fixed SCP-280 and SCP-457 being able to harm Serpent's Hand members.`,
};

export default logFileDescriptions;
