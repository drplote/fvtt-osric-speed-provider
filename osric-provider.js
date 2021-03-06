Hooks.on('init', () => {
  game.settings.register("osric-speed-provider", "useSegmentBreakdown", {
    name: "Change colors every 1/10th of movement?",
    hint: "Enable this to make it easier to move one segment at a time.",
    scope: "world",
    config: true,
    default: true,
    type: Boolean
  });
});

Hooks.once("dragRuler.ready", (SpeedProvider) => {
  class OsricSpeedProvider extends SpeedProvider {
    get colors() {
      return [
        {
          id: "full-move",
          default: 0xFFFC33,
          name: "osric-speed-provider.full-move"
        },
        {
          id: "half-move",
          default: 0x00FF00,
          name: "osric-speed-provider.half-move"
        },
        {
          id: "odd-step",
          default: 0x00FF00,
          name: "osric-speed-provider.odd-segment"
        },
        {
          id: "even-step",
          default: 0xFFFC33,
          name: "osric-speed-provider.even-segment"
        }
      ];
    }

    getMovementRawValue(token){
      let actorData = token.actor.data;
      if (actorData.type == "npc"){
        return actorData.data.movement;
      }

      return actorData.data.attributes.movement.value;
    }

    parseRawMovementValue(rawMove){
      if (rawMove){
        if (Number.isFinite(rawMove)){
          return rawMove;
        }

        let regex = new RegExp("^[^\\d]*(\\d+)");
        return rawMove.match(regex)?.[1];
      }
      return null;
    }

    getMovementSpeed(token){
      let movement = this.parseRawMovementValue(this.getMovementRawValue(token));

      if (movement == null){
        movement = 120;
      }
      return movement;
    }

    /** @param token {Token} The token to check movement */
    getRanges(token) {

      let movementSpeed = this.getMovementSpeed(token);

      let isSegmentBasedMovement = game.settings.get("osric-speed-provider", "useSegmentBreakdown");

      let ranges = [];
      if (isSegmentBasedMovement === true){

        let moveStep = movementSpeed / 10;

        for (let i = 1; i <= 10; i++){
          ranges.push({range: moveStep * i, color: (i % 2 === 0) ? "even-step" : "odd-step"});
        }
      }
      else {
        let halfMoveSpeed = movementSpeed / 2;
        ranges = [{range: halfMoveSpeed, color: "half-move"}, {range: movementSpeed, color: "full-move"}];
      }

      return ranges;
    }

    getCostForStep(token, area, options = {}) {
      return 1;
    }
  }

  dragRuler.registerModule("osric-speed-provider", OsricSpeedProvider);
});


