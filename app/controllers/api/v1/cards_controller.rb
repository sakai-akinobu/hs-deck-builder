module Api::V1
  class CardsController < ApplicationController

    def index
      conditions = []
      condition_params = []

      if params[:class]
        conditions << "card_class IN (?, ?)"
        condition_params << 'NEUTRAL' # TODO
        condition_params << params[:class]
      end
      if params[:cost]
        conditions << "cost = ?"
        condition_params << params[:cost]
      end
      if params[:query]
        conditions << "(name LIKE ? OR description LIKE ?)"
        condition_params << "%#{params[:query]}%"
        condition_params << "%#{params[:query]}%"
      end

      cards = Card
        .where(conditions.join(' AND '), *condition_params)
        .order("card_class, cost")
        .page(params[:page])

      render json: {
        cards: cards,
        page: {
          prev: cards.prev_page,
          current: cards.current_page,
          next: cards.next_page,
          last: cards.total_pages,
        },
      }
    end

  end
end
