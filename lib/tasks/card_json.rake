namespace :card_json do

  require "open-uri"

  desc "import card.json from hearthstonejson.com"
  task import: :environment do
    open "https://api.hearthstonejson.com/v1/latest/jaJP/cards.collectible.json" do |file|
      Card.delete_all

      cards = JSON.parse!(file.read)
      cards.each do |card|
        card = Card.build_by_json(card)
        card.save
      end
    end
  end

end
