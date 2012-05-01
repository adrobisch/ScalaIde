/**
* This script loads the editor and maps function
*
* @author sischnee <sischnee@gmail.com>
* @since 2012/04/23
* @license BSD common license
*/

var IDE = IDE || {};
IDE.htwg = IDE.htwg || {};

IDE.htwg.Editor = function($){
		
    if ( jQuery('#editor').length == 0 ) {
        //no need to initialize
        return false;
    }
    
    /**
    * Contains the webSocket
    *
    * @var
    * @access public
    * @type object
    */
    this._webSocket = false;
    
    /**
    * Scope duplicator / parent this
    *
    * @var
    * @access private
    * @type object
    */
    var that = this;
    
    /**
    * Constructor
    *
    * Initializes the editor
    *
    * @access public
    * @return void
    */
    this.init = function ( options ) {
    	$("#editor").keyup(this.handleKey);
    };
    
    /**
     * Contains the filename
     *
     * @var
     * @access public
     * @type string
     */
    this._fileName = "";
        
    	
    this.sendMessage = function( msg ) {
    	if ( msg.file && !msg.folder ){
    		this._fileName = msg.file;
    	}
    	this._webSocket.send( JSON.stringify( msg ) );
    };

    this.handleKey = function(e) {
        //if(e.charCode == 36 || e.keyCode == 36) {  // hit $ to send
    	
    	//every key press saves the document, like google doc
            //e.preventDefault();
            var msg = {
            		"command": "save",
            		"file": that._fileName,
            		"value": window.aceEditor.getSession().getValue()
            };
            that.sendMessage( msg );
        //}
    };
        
    this.receiveEvent = function(event) {
        var data = JSON.parse(event.data);

    	// Handle errors
        if(data.error) {
            //$("#onError span").text(data.error)
            //$("#onError").show()
            alert("Error");
            return;
        } else {
        	
        	//probably there might be more commands
        	switch (data.command) {
        		case "load":
        			window.aceEditor.getSession().setValue(data.text);
        			break;
        		default:
        	}
        	
        }        
    };
    
    this.init();    
};
