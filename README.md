# Lancer Speed Provider

A [Drag Ruler](https://foundryvtt.com/packages/drag-ruler) speed provider for lancer.  It features integration with conditions and actor types.

## Features

 * Tracks whether a unit is allowed to overcharge to determine whether to show the third range band (Overcharge + Boost)
 * Checks for Immobilized, Stunned, Shutdown, or Down and Out and shows no available movement if any of those conditions are active.
 * Checks for Slowed and Prone and only shows the standard Move range band in that case
 * If a unit is prone, it halves their movement or, if terrain ruler is installed, treats all tiles as Difficult Terrain.
 * Tracks if a unit started their turn prone and if so, only shows boost options if the unit stood up.
 * If a unit heads north it makes a Pan flag.

## Installation

### Recommended

Search for “Lancer Speed Provider” on the foundry module browser.

### Manual

Paste the following manifest url into the foundry module installer:

```
https://github.com/BoltsJ/lancer-speed-provider/releases/latest/download/module.json
```
