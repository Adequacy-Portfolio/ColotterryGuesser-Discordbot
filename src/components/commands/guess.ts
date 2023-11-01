import { CommandInteraction } from 'discord.js';
import { Discord, Slash } from 'discordx';

@Discord()
export class Guess {

    @Slash({
        description: "This is a test slash command",
        name: "test"
    })
    test(interaction: CommandInteraction) {
        console.log('3LAWI')
        interaction.reply({
            content: "Hey!"
        })
    }
}