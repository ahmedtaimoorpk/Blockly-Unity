/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(function () {

    let currentButton;

    function run(event) {
        loadWorkspace(event.target);
        Blockly.JavaScript.addReservedWords('code');
        var code = Blockly.JavaScript.workspaceToCode(Blockly.getMainWorkspace());
        // code += 'MusicMaker.play();';
        console.log(code);
        try {
            eval(code);
        } catch (error) {
            console.log(error);
        }
    }

    function loadWorkspace(button) {
        let workspace = Blockly.getMainWorkspace();
        // workspace.clear();
        if (button.blocklyXml) {
            Blockly.Xml.domToWorkspace(button.blocklyXml, workspace);
        }
    }

    function save(button) {
        let xml = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace());
        button.blocklyXml = xml;
    }

    function handleSave() {
        document.body.setAttribute('mode', 'edit');
        save(currentButton);
    }

    function enableEditMode() {
        document.querySelectorAll('.button').forEach(btn => {
            btn.removeEventListener('click', handlePlay);
            btn.addEventListener('click', enableBlocklyMode);
        });
    }

    function enableMakerMode() {
        document.body.setAttribute('mode', 'maker');
        document.querySelectorAll('.button').forEach(btn => {
            btn.addEventListener('click', handlePlay);
            btn.removeEventListener('click', enableBlocklyMode);
        });
    }

    function enableBlocklyMode(e) {
        document.body.setAttribute('mode', 'blockly');
        currentButton = e.target;
        loadWorkspace(currentButton);
    }

    document.querySelector('#run').addEventListener('click', run);


    var blocklyArea = document.getElementById('blocklyArea');
    var blocklyDiv = document.getElementById('blocklyDiv');
    var demoWorkspace = Blockly.inject(blocklyDiv,
        {
            media: '../../media/',
            toolbox: document.getElementById('toolbox')
        });
    var onresize = function (e) {
        // Compute the absolute coordinates and dimensions of blocklyArea.
        var element = blocklyArea;
        var x = 0;
        var y = 0;
        do {
            x += element.offsetLeft;
            y += element.offsetTop;
            element = element.offsetParent;
        } while (element);
        // Position blocklyDiv over blocklyArea.
        blocklyDiv.style.left = x + 'px';
        blocklyDiv.style.top = y + 'px';
        blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
        blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
        Blockly.svgResize(demoWorkspace);
    };
    window.addEventListener('resize', onresize, false);
    onresize();
    Blockly.svgResize(demoWorkspace);

})();
