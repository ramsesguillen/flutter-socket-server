const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');


const bands = new Bands();
bands.addBand( new Band('Queen'));
bands.addBand( new Band('Bon Jovi'));
bands.addBand( new Band('Héroes del Silencio'));
bands.addBand( new Band('Metalica'));
bands.addBand( new Band('The Killers'));


io.on('connection', client => {
    console.log('Cliente conectado');

    client.emit('active-bands', bands.getBands() );

    client.on('disconnect', () => {
        console.log('Cliente desconectado')
    });

    client.on('mensaje', ( payload ) => {
        console.log('Mensjar!!', payload)

        io.emit('mensaje', { admin: 'Nuevo mensaje' });
    });
    client.on('emitir-mensaje', ( payload ) => {
        console.log( payload)

        io.emit('nuevo-mensaje', payload );
    });

    client.on('vote-band', ( payload ) => {
        bands.voteBand( payload.id );
        client.emit('active-bands', bands.getBands() );
    });

    client.on('add-band', ( payload ) => {
        bands.addBand( new Band( payload.name ) );
        client.emit('active-bands', bands.getBands() );
    });

    client.on('delete-band', ( payload ) => {
        bands.deleteBand( payload.id );
        client.emit('active-bands', bands.getBands() );
    });
});