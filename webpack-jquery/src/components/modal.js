
(function () {

    $.extend({
        createModal: (opts) => {
            let modalTitle = opts.modalTitle;
            let modalBody = opts.modalBody;
            let modalFooter = opts.modalFooter;

            let modalEle = `<div class="modal" id="${opts.modalId}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                            <h4 class="modal-title" id="myModalLabel">${modalTitle}</h4>
                                        </div>
                                        <div class="modal-body">${modalBody}</div>
                                        <div class="modal-footer">${modalFooter}</div>
                                    </div>
                                </div>
                            </div>`
            $('body').append(modalEle);
            if (opts.afterMount) {
                opts.afterMount(opts.modalId)
            }
        }
    })
})($)