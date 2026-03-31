{
  description = "cpsc304 project development enviroment";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;

		  config.allowUnfree = true;
        };

      in  {
        flakedPkgs = pkgs;

        # enables use of `nix shell`
        devShells.default = pkgs.mkShell {
          # add things you want in your shell here
          buildInputs = with pkgs; [
            nodejs_24 
			typescript-language-server
          ];
        };
      }
    );
}

