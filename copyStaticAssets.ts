import * as shell from "shelljs";

shell.cp("-R", "src/public", "dist/");
shell.cp("-R", "public/*", "dist/");
shell.cp("-R", ".env", "dist/");
// shell.cp("-R", "src/public/js/lib", "dist/public/js/");
// shell.cp("-R", "src/public/fonts", "dist/public/");
// shell.cp("-R", "src/public/images", "dist/public/");
// shell.cp("-R", "src/views", "dist/");
