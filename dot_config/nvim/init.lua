-- https://github.com/AstroNvim/AstroNvim?tab=readme-ov-file#minimal-confignviminitlua
local lazy_path = vim.fn.stdpath "data" .. "/lazy/lazy.nvim"
if not vim.uv.fs_stat(lazy_path) then
    vim.fn.system({
        "git",
        "clone",
        "--filter=blob:none",
        "https://github.com/folke/lazy.nvim.git",
        "--branch=stable",
        lazy_path
    })
end
vim.opt.rtp:prepend(lazy_path)

require("lazy").setup { "AstroNvim/AstroNvim", version = "^5", import = "astronvim.plugins" }
