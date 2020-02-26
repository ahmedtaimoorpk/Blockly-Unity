Blockly.Blocks['shapes'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Show")
            .appendField(new Blockly.FieldDropdown([["sphere", "1"], ["cube", "2"], ["capsule", "3"], ["showAll", "4"], ["None", "5"]]), "value");
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['shapes'] = function (block) {
    var value = '\'' + block.getFieldValue('value') + '\'';
    return 'unityInstance.SendMessage("Main Camera", "ctrl",' + value + ');\n';
};