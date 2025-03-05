class Clientmodel {
  final int Id;
  final String Name;
  final String? Description;
  final int Nif;
  final String Route;
  final String Address;

  // Now the constructor is const, and fields are initialized in the constructor
  const Clientmodel({
    this.Id = 1,
    this.Name = "Não existe nome associado ao cliente",
    this.Description = "Não Existe descrição associada ao cliente",
    this.Nif = 999999999,
    this.Route = "N/A",
    this.Address = "N/A",
  });
}
