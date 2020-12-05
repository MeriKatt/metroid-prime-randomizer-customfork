import { SettingsFlags, SettingsFlagsArgs } from '../settingsFlags';
import { getPaddedBitStringFromSettingsString } from '../../utilities';

export class Tricks extends SettingsFlags {
  // Tallon
  alcoveNoItems = false;
  arborChamberWithoutPlasma = false;
  climbFrigateCrashSite = false;
  greatTreeHallBarsSkip = false;
  lifeGroveSpinnerWithoutBoostBall = false;
  lifeGroveTunnelHpbj = false;
  rootCaveArborChamberWithoutGrapple = false;
  tallonTransportTunnelCMinimumReqs = false;

  // Chozo
  antechamberWithPowerBombs = false;
  arboretumPuzzleSkip = false;
  climbReflectingPoolWithoutBoostBall = false;
  climbTowerOfLightWithoutMissiles = false;
  crossMagmaPoolSuitless = false;
  crossMagmaPoolWithoutGrapple = false;
  crossMagmaPoolWithoutGrappleOrScan = false;
  crosswayHpbj = false;
  crosswayItemFewerReqs = false;
  furnaceAccessWithoutSpider = false;
  furnaceSpiderTrackItemHBJ = false;
  furnaceSpiderTrackItemSpaceJumpBombs = false;
  gatheringHallWithoutSpaceJump = false;
  hallOfTheEldersBombSlotsWithoutSpider = false;
  mainPlazaGrappleLedgeOnlyGrapple = false;
  mainPlazaHpbj = false;
  mainPlazaItemsOnlySpaceJump = false;
  mainPlazaTreeNoSpaceJump = false;
  reflectingPoolAccessWithoutWaveBeam = false;
  ruinedFountainItemFlaahgraSkip = false;
  ruinedFountainItemFlaahgraSkipNsj = false;
  ruinedNurseryWithoutBombs = false;
  ruinedShrineScanDashEscape = false;
  sunTowerIbj = false;
  towerOfLightNsj = false;
  towerChamberNsj = false;
  upperRuinedShrineTowerOfLightFewerAccessReqs = false;
  vaultAccessFromMainPlaza = false;
  vaultItemNoBombs = false;
  wateryHallUnderwaterFlaahgraSkip = false;

  // Magmoor
  crossTwinFiresTunnelSuitless = false;
  crossTwinFiresTunnelWithoutSpider = false;
  fieryShoresAccessWithoutMorphGrapple = false;
  fieryShoresItemSj = false;
  lateMagmoorNoHeatProtection = false;
  lavaLakeItemOnlyMissiles = false;
  lavaLakeItemSuitless = false;
  plasmaProcessingItemWithoutGrappleSpider = false;
  shoreTunnelEscapeWithoutSpaceJump = false;
  suitlessMagmoorRun = false;
  suitlessMagmoorRunMinimal = false;
  triclopsPitItemWithoutSpaceJump = false;
  triclopsPitItemWithCharge = false;
  warriorShrineMinimumReqs = false;
  warriorShrineWithoutBoost = false;

  // Phendrana
  chapelOfTheEldersWithPowerBombs = false;
  chozoIceTempleItemWithIS = false;
  chozoIceTempleWithoutSpaceJump = false;
  climbFrozenPikeWithoutBombs = false;
  climbObservatoryWithoutBoost = false;
  climbRuinedCourtyardWithoutBoostSpider = false;
  controlTowerEscapeSJ = false;
  exitPhendranaCanyonNoItems = false;
  exitQuarantineCaveRuinedCourtyardSlopeJump = false;
  gravityChamberLedgeItemWithoutGrapplePlasma = false;
  iceRuinsEastSpiderItemWithoutSpider = false;
  observatoryPuzzleSkip = false;
  phendranaTransportSouthToTransportAccessWithoutSpider = false;
  phendranaShorelinesSpidertrackMinRequirements = false;
  removePhendranaDepthsGrappleReqs = false;
  quarantineMonitorDash = false;
  
  // Mines
  climbOreProcessingWithoutGrappleSpider = false;
  climbPhazonProcessingCenterWithoutSpider = false;
  eliteResearchInfiniteBoostClip = false;
  eliteResearchLaserWithoutBoost = false;
  lowerPhazonMineWithoutSpiderGrapple = false;
  mainQuarryItemWithoutSpider = false;
  mainQuarryToOreProcessingWithoutGrapple = false;
  phazonMiningTunnelItemWithoutPhazonSuit = false;
  spiderlessShafts = false;
  ventShaftHpbj = false;

  // All 
  boostThroughBombTunnels = false;
  destroyBombCoversWithPowerBombs = false;
  removeThermalReqs = false;
  removeXrayReqs = false;
  
  // Gravityless
  crashedFrigateGammaElevatorWithoutGravity = false;
  frigateCrashSiteItemOnlyScanVisor = false;
  frigateCrashSiteItemWithoutGravitySuit = false;
  gravitylessFrigate = false;
  hydroAccessTunnelWithoutGravity = false;
  towerChamberNoGravity = false;
  wateryHallUnderwaterSlopeJump = false;
  removeGravityReqs = false;
  
  // IS
  earlyPhendranaBehindIceItemsWithIS = false;
  hallOfTheEldersItemsWithIS = false;
  magmaPoolItemWithIS = false;
  wateryHallScanPuzzleWithIS = false;
  waveSunOobWallcrawlWithIS = false;
  
  // OoB
  iceBeamBeforeFlaahgraOobWallcrawl = false;
  lifeGroveWallcrawl = false;
  outOfBoundsWithoutMorphBall = false;
  plasmaProcessingFromMagmoorWorkstationOob = false;
  trainingChamberAndAccessOobWallcrawl = false;

  constructor(args?: SettingsFlagsArgs) {
    super();

    if (args) {
      this.setSettings(args);
    }
  }

  setSettings(args: SettingsFlagsArgs): void {
    const allowedKeys = this.getSettingsKeys();

    // To prevent outdated settings flags from being assigned, filter them
    const filteredArgs = Object.keys(args)
      .filter(key => allowedKeys.includes(key))
      .reduce((obj, key) => {
        obj[key] = args[key];
        return obj;
      }, {});

    Object.assign(this, filteredArgs);
  }

  static fromSettingsString(settingsString: string): Tricks {
    const settings: SettingsFlagsArgs = {};
    const keys = new Tricks().getSettingsKeys();
    const bitString = getPaddedBitStringFromSettingsString(settingsString, keys.length);

    let index = 0;
    for (const key of keys) {
      const currentBit = bitString.substr(index, 1);
      settings[key] = currentBit === '1' ? true : false;
      index += 1;
    }

    return new Tricks(settings);
  }
}


