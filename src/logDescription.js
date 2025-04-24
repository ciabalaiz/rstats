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
  "log2.json": `Changes 4/21/2025
- Fixed 076-2's spear FOV change persisting if you unequip the spear after raising it.
- Fixed 076-2's Vengeance audio effects persisting after death.
- 076-2's ranged weapons now move faster and are handled by the client. This should make them feel better to use.
- 076-2's sword now consumes less stamina during his Vengeance phase.`,
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
