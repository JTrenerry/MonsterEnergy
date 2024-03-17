#!/bin/bash
# Complies the TS to JS and moves it to the correct folder
rm -r $HOME/.local/share/cinnamon/desklets/MonsterEnergy@cinnamon.org
mkdir $HOME/.local/share/cinnamon/desklets/MonsterEnergy@cinnamon.org
cp ./src/* $HOME/.local/share/cinnamon/desklets/MonsterEnergy@cinnamon.org/
