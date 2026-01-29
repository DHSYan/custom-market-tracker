{
  description = "cpsc304 project development enviroment";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-25.11";
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
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs_24 # You need to delete, nodejs on your own machine, if they are installed, and the version is causing YARN issues.
			typescript-language-server
            oracle-instantclient
            lsof
          ];
        };
      }
    );
}
