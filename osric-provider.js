Hooks.once("dragRuler.ready", (SpeedProvider) => {
  class OsricSpeedProvider extends SpeedProvider {
    get colors() {
      return [
        {
          id: "round",
          default: 0x00FF00,
          name: "osric-speed-provider.round",
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

    getMovementSpeed(token){
      let movement = parseInt(this.getMovementRawValue(token));

      if (isNaN(movement)){
        movement = 120;
      }
      return movement;
    }

    /** @param token {Token} The token to check movement */
    getRanges(token) {

      let movementSpeed = this.getMovementSpeed(token);

      const ranges = [{range: movementSpeed, color: "round"}]; 
      return ranges;
    }

    getCostForStep(token, area, options = {}) {
      return 1;
    }
  }

  dragRuler.registerModule("osric-speed-provider", OsricSpeedProvider);
});


