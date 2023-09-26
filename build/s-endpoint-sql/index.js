function e(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var r = e(function (e, { services: r, database: t }) {
  e.get("/:id", async function (e, r) {
    try {
      const a = e.params.id,
        s = await t.raw(
          `SELECT options FROM directus_panels WHERE id = '${[a]}'`
        ),
        o = JSON.parse(s[0].options),
        n = await t.raw(o.sql),
        i = Object.keys(n[0]).map((e) => ({ text: e, value: e }));
      r.json({ headers: i, items: n });
    } catch (e) {
      console.error("Error in endpoint:", e),
        r
          .status(500)
          .json({ error: "An error occurred while processing the request." });
    }
  });
});
export { r as default };
