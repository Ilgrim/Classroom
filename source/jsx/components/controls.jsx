/** @jsx React.DOM */

define([
    'react',
    'utils',
    'constants',
    'configs',
    'skylink',
    'router'
], function (
    React,
    Utils,
    Constants,
    Configs,
    Skylink,
    Router
) {

    var Controls = React.createClass({
        handleMCUClick: function(e) {
            Dispatcher.setMCU(e.target.checked);
        },
        componentDidUpdate: function() {
            var $mcu = document.getElementById('mcu');
            if($mcu) {
                $mcu.checked = this.props.state.room.useMCU;
            }
        },
        handleStartRoom: function() {
            var room = this.props.state.room.useMCU ? 'm' : '';


            var selectedRoomName = document.getElementById('roomName').value;
	        if(selectedRoomName !== "" && selectedRoomName !== "Enter Your Room Name Here."){
                room = selectedRoomName;
            }else{
                alert("You have not entered a room name a random one will be created for you.");
                room = room + Utils.uuid(6);
            }
            Router.setRoute('/' + room.replace(/ /g,''))

        },
        handleLeaveRoom: function() {
            Skylink.leaveRoom();
            Router.setRoute('/');
        },
        handleVideoMute: function() {
            var user = this.props.state.users.filter(function (user) {
                return user.id === 0;
            })[0];
	        Skylink[user.videoMute ? 'enableVideo' : 'disableVideo']();
        },
        handleAudioMute: function() {
            var user = this.props.state.users.filter(function (user) {
                return user.id === 0;
            })[0];
	        Skylink[user.audioMute ? 'enableAudio' : 'disableAudio']();
        },
        handleRoomLock: function() {
            if(this.props.state.users.length < Configs.maxUsers) {
                Skylink[this.props.state.room.isLocked ? 'unlockRoom' : 'lockRoom']();
            }
        },
        handleScreenshare: function() {
            var user = this.props.state.users.filter(function (user) {
                return user.id === 0;
            })[0];

            if(!this.props.state.room.screensharing) {

                Dispatcher.sharescreen(true);

                Skylink.shareScreen();
            }
            else if(user.screensharing) {

                Dispatcher.sharescreen(false);

                Skylink.stopScreen();
            }
        },
        handleLinkClick: function (e) {
            e.target.setSelectionRange(0, e.target.value.length);
        },
        handleClose: function(e) {
            Dispatcher.toggleControls();
        },
        render: function() {
            var res = [];
            var user = this.props.state.users.filter(function (user) {
                return user.id === 0;
            })[0];

           res.push(
                <div className="logo">Class Room</div>
                );

            if(this.props.state.state === Constants.AppState.FOYER) {
                res.push(
                    <button className="joinRoom mainControl" onClick={this.handleStartRoom}>
                        Start a new classroom
                    </button>
                    );

                res.push(
                    <div className="description">
                        <p>
                            Just enter a classroom name and hit &quot;Start a new classroom&quot;<br /><br />
                        </p>
                    </div>
                );
	                res.push(
                    <div className="link">
                        <input name="roomName" id="roomName" type="text" placeholder="Enter Your Room Name Here." />
                    </div>
                    );
            }
            else if(this.props.state.state === Constants.AppState.IN_ROOM) {
                res.push(
                    <button className="leaveRoom mainControl" onClick={this.handleLeaveRoom}>
                        Leave this classroom
                    </button>
                    );

                res.push(
                    <div className="link">
                        Share this link to invite others into this classroom<br />
                        <input type="text" value={location.toString()} onClick={this.handleLinkClick} readOnly />
                    </div>
                    );

                res.push(
                    <div className="status">Status: {this.props.state.room.status}</div>
                    );

                if(this.props.state.room.status === Constants.RoomState.CONNECTED && user.stream != null) {

                    res.push(
                        <div class="center">
                          <button id="videoMute" onClick={this.handleVideoMute} className={user.videoMute ? '' : 'on'} title="Mute/Unmute Video"></button>
                          <button id="audioMute" onClick={this.handleAudioMute} className={user.audioMute ? '' : 'on'} title="Mute/Unmute Audio"></button>
                          <button id="roomLock" onClick={this.handleRoomLock} className={this.props.state.room.isLocked ? '' : 'on'} title="Lock/Unlock Room"></button>
                        </div>
                    );
                }
            }

            return (
                <section id="controls">
                    <nav>
                        <button onClick={this.handleClose} className={this.props.state.state === Constants.AppState.IN_ROOM ? 'close' : ''}></button>
                        <button></button>
                        <button></button>
                    </nav>
                    <div>
                        {res}
                    </div>
                </section>
                )
        }
    });

    return Controls;
});
