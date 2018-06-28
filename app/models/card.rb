class Card < ApplicationRecord

  def self.build_by_json(json)
    card = Card.new

    card.cid = json["id"]
    card.dbf_id = json["dbfId"]
    card.name = json["name"]
    card.description = json["description"]
    card.flavor = json["flavor"]
    card.artist = json["artist"]
    card.attack = json["attack"]
    card.card_class = json["cardClass"]
    card.collectible = json["collectible"]
    card.cost = json["cost"]
    card.elite = json["elite"]
    card.faction = json["faction"]
    card.health = json["health"]
    card.rarity = json["rarity"]
    card.set = json["set"]
    card.card_type = json["card_type"]

    card
  end

end
