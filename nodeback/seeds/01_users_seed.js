exports.seed = function(knex) {
    // Deletes all existing entries
    return knex('users').del()
      .then(function () {
        // Inserts seed entries
        return knex('users').insert([
          { nombre: 'John Doe', correoElectronico: 'johndoe@example.com', imagen: '1',direccion:'1',numeroTelefono:'1',password:'hola' },
    
        ]);
      });
  };
  