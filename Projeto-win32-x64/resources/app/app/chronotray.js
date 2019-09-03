const electron = require('electron');
const { Tray, app, Menu } = electron;
const contextMenu = Menu.buildFromTemplate([
    {
        label: 'Sair',
        click: () => {
            app.quit();
        }
    },
]);

class ChronoTray extends Tray {

    constructor(iconPath, mainWindow){
        super(iconPath);
        this.mainWindow = mainWindow;
        this.on('click', this.onClick.bind(this));
        this.setToolTip('Esta é uma aplicação Electron');
        this.setContextMenu(contextMenu)
    }

    onClick(event, bounds){
        const { x, y } = bounds
        const { width, height } = this.mainWindow.getBounds();
        if(this.mainWindow.isVisible()){
            this.mainWindow.hide();
        }else{
            this.mainWindow.setBounds({
                x: x >= 400 ? x - width / 2: x,
                y: y >= 300 ? y - height: y,
                width,
                height
            })
            this.mainWindow.show()
        }
    }
}

module.exports = ChronoTray;