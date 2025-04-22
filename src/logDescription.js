// src/logDescriptions.js

const logFileDescriptions = {
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
