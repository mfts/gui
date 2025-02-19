import { browser } from "wdio-electron-service";
import { setupUtils } from "./utils.ts";

type utilType = ReturnType<typeof setupUtils>;

describe("basic smoke test", () => {
  let utils: utilType;

  beforeEach(async () => {
    utils = setupUtils(browser);
    await utils.goHome();
  });

  it("install brewkit from the made by tea tab", async () => {
    const { screen } = utils!;

    // app launches to discover screen by default - make sure Stable Diffusion is there
    await expect(await screen.findByText("Stable Diffusion web UI")).toExist();

    // navigate to "made by tea" page
    const btn = await utils.findButton("made by tea");
    btn.click();

    // find the brewkit package
    const pkgCard = await utils.findPackageCardBySlug("tea_xyz_brewkit");
    pkgCard.click();

    await utils.packageDetailsLoaded();

    // Be nice to devs running this over and over
    await utils.uninstallPackageIfNeeded();

    await utils.installLatestVersion("tea_xyz_brewkit");

    await utils.verifyAndCloseNotification(/^Package tea.xyz\/brewkit .* has been installed./);
    await expect(await screen.findByRole("button", { name: "OPEN IN TERMINAL" })).toExist();
  });

  it("search and install create-dmg", async () => {
    const { screen, searchTerm } = utils!;
    await searchTerm("create-dmg");

    const packageFullname = "github.com/create-dmg/create-dmg";
    const createDmgSlug = packageFullname.replace(/[^\w\s]/gi, "_").toLocaleLowerCase();
    const createDmgCard = await utils.findSearchPackageCardBySlug(createDmgSlug);
    await expect(createDmgCard).toExist();
    createDmgCard.click();

    await utils.packageDetailsLoaded();
    await utils.uninstallPackageIfNeeded();

    await utils.installLatestVersion("github_com_create_dmg_create_dmg");

    await utils.verifyAndCloseNotification(
      /^Package github.com\/create-dmg\/create-dmg .* has been installed./
    );
  });

  it("should be able to install specific version", async () => {
    const { screen, searchTerm } = utils!;
    await searchTerm("grep");
    const grepCard = await utils.findSearchPackageCardBySlug("gnu_org_grep");
    await expect(grepCard).toExist();
    grepCard.click();

    await utils.uninstallPackageIfNeeded();
    await utils.installSpecificVersion("gnu_org_grep", "3.8.0");

    await utils.verifyAndCloseNotification(/^Package gnu.org\/grep .* has been installed./);

    // Now test the update
    await utils.goHome();

    const menuBtn = await screen.findByTestId("menu-button-updates-available");
    menuBtn.click();

    const header = await screen.findByText("available updates");
    await expect(header).toExist();

    const updateBtn = await utils.findByTestId("install-button-gnu_org_grep");
    await expect(updateBtn).toExist();
    updateBtn.click();

    await utils.verifyAndCloseNotification(/^Package gnu.org\/grep .* has been installed./);
  });
});
